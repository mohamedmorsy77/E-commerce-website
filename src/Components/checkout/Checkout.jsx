import React, { useState } from "react";
import { useFormik } from "formik";
import { checkoutSchema } from "../validationSchema/ValidationSchema";
import InputField from "../reusableInputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { createCashOrder, createOnlineCashOrder } from "../../network/OrderApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { loadStripe } from "@stripe/stripe-js";
const stripe = loadStripe(
  "pk_test_51RAB3rJMlxMnk1xg2d1XsCloDkqRgqvR4QtPMm2v7bzGgDeP1dSxeVaSAqEslInD0u5Om5E9EvqHGwfjaCkMTPVo00DbAm2OvE"
);
function Checkout() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.cart);
  const { cartId } = useSelector((state) => state.cart.cartInfo);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: checkoutSchema,
    onSubmit: async (values, formikHelper) => {
      formikHelper.resetForm();
      try {
        if (paymentMethod === "cash") {
          await dispatch(
            createCashOrder({ cartId, orderInfo: values })
          ).unwrap();
          setTimeout(() => {
            toast.success("Your Order Is Placed Successfully");
          }, 500);
          navigate("/allorders");
        } else if (paymentMethod === "online-payment") {
          const response = await dispatch(
            createOnlineCashOrder({ cartId, orderInfo: values })
          ).unwrap();
          
          if (response.status === "success" && response.session?.url) {
            window.location.href = response.session.url;
          
          } else {
            toast.error("Failed to create a payment session");
          }
        }
      } catch (err) {
        toast.error("Failed to Placed Your Order");
      }
    },
  });
  return (
    <section className="checkout mt-all py-5 position-relative">
      
      <div className="container">
        <div className="row">
          <h2 className="text-success lh-base">
            You're Almost There! Complete Your Checkout
          </h2>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="tel"
                name="phone"
                placeholder="Write your phone here..."
                formik={formik}
              />
              <InputField
                type="text"
                name="city"
                placeholder="Write your city..."
                formik={formik}
              />
              <div className="mt-4">
                <label className="mb-2 text-success fw-medium">
                  Address Details
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your address here..."
                  className={`form-control ${
                    formik.touched.details
                      ? formik.errors.details
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  aria-describedby="emailHelp"
                  name="details"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.errors.details && formik.touched.details && (
                <div className="invalid-feedback d-block">
                  {formik.errors.details}
                </div>
              )}
              <div className="mt-4 d-flex flex-column">
                <div className="mt-3 d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    id="cash"
                    value="cash"
                    className="text-success"
                    name="payment"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "cash"}
                  />
                  <label htmlFor="cash" className="text-success fw-bold">
                    Cash Payment
                  </label>
                </div>
                <div className="mt-3 d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    id="online-payment"
                    value="online-payment"
                    className="text-success"
                    name="payment"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    checked={paymentMethod === "online-payment"}
                  />
                  <label
                    htmlFor="online-payment"
                    className="text-success fw-bold"
                  >
                    Online Payment
                  </label>
                </div>
                <button
                  className="mt-4 btn btn-success fw-bolder d-flex gap-2 justify-content-center align-items-center"
                  disabled={!formik.isValid}
                >
                  {paymentMethod === "cash"
                    ? "continue with cash payment"
                    : "continue with online payment"}{" "}
                  {loading && <PulseLoader color="#69ca46" size={10} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
