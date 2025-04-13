import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import forgetPassword from "../../assets/images/fp-g.svg";
import { useFormik } from "formik";
import { forgetPassSchema } from "../validationSchema/ValidationSchema";
import { useDispatch } from "react-redux";
import { authResetPassword } from "../../network/AuthApi";
import { toast} from "react-toastify";
import InputField from "../reusableInputs/InputField";
import { PulseLoader } from "react-spinners";

function ResetPassword() {
  const redirectedRef = useRef(false);
  const [isLoading, SetLoading] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPassSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, formikHelper) => {
      SetLoading(true);
      dispatch(authResetPassword(values)).then((data) => {
        if (data.payload.statusMsg === "success" && !redirectedRef.current) {
          redirectedRef.current = true;
          SetLoading(false);
          setTimeout(() => {
            toast.success(data.payload.message);
          }, 500);

          formikHelper.resetForm();
        } else {
          SetLoading(false);
          redirectedRef.current = false;

          toast.error(data.payload.message);
        }
      });
    },
  });
  console.log("Reset Password");

  if (redirectedRef.current) {
    return <Navigate to="/resetCode" />;
  }

  // eslint-disable-next-line

  return (
    <section className="sign mt-all py-5">
     
    
        <div className="container">
          <div className="row m- px-4 align-items-center">
            <div className="col-12 col-lg-6  signup-img text-center text-lg-start">
              <img
                className="img-fluid"
                src={forgetPassword}
                alt="sign-up-image"
              />
            </div>
            <div className="col-12 col-lg-6 ">
              <h2>Forgot your password?</h2>
              <p className="">
                {" "}
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </p>
              <form onSubmit={formik.handleSubmit}>
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  formik={formik}
                />

                <button
                  type="submit"
                  className="btn btn-success fw-medium w-100 mt-4"
                >
                  Verfiy
                  {isLoading && <PulseLoader color="#69ca46" size={10} />}
                </button>
              </form>
            </div>
          </div>
        </div>
  
    </section>
  );
}

export default ResetPassword;
