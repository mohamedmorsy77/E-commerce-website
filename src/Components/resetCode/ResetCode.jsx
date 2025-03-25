import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authResetCode } from "../../network/AuthApi";
import { toast, ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

import AuthSpinner from "../../Components/spinner/authSpinner/AuthSpinner";
import InputField from "../reusable/InputField";
import { resetCodeSchema } from "../validationSchema/ValidationSchema";
import { PulseLoader } from "react-spinners";
function ResetCode() {
  const redirectedRef = useRef(false);
  const [isLoading, SetLoading] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: resetCodeSchema,
    onSubmit: (values) => {
      SetLoading(true);

      dispatch(authResetCode(values.resetCode)).then((data) => {
        if (data.payload.status) {
          redirectedRef.current = true;
          SetLoading(false);
          setTimeout(() => {
            toast.success(
              "Reset code verified successfully! Please enter your new password."
            );
          }, 500);
        } else {
          SetLoading(false);
          redirectedRef.current = false;
          toast.error(data.payload.message);
        }
      });
    },
  });
  if (redirectedRef.current) {
    return <Navigate to="/newPassword" />;
  }
  return (
    <section className="sign">
      <ToastContainer />
        <div className="container">
          <div>
            <h1 className="fw-bold text-muted">Enter Your Reset Code</h1>
          </div>

          <div className="row  mt-3">
            <div className="col-12">
              <form onSubmit={formik.handleSubmit}>
                <label className="fw-bold">Reset Code</label>
                <InputField
                  type="text"
                  name="resetCode"
                  placeholder="Enter your reset code..."
                  formik={formik}
                />

                <button
                  className="btn fw-bold  btn-success w-100 mt-4"
                  type="submit"
                >
                  Verfiy {isLoading && <PulseLoader color="#69ca46" size={10} />}
                </button>
              </form>
            </div>
          </div>
        </div>
 
    </section>
  );
}

export default ResetCode;
