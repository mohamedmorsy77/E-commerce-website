import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword } from "../../network/AuthApi";
import { toast, ToastContainer } from "react-toastify";
import { newPasswordSchema } from "../validationSchema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import InputField from "../reusableInputs/InputField";
function NewPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: newPasswordSchema,
    onSubmit: (values) => {
      dispatch(createNewPassword(values))
        .unwrap()
        .then((action) => {
          console.log(action);
          setTimeout(() => {
            toast.success("Password changed successfully!");
          }, 500);
          formik.resetForm();
          navigate("/login");
        })
        .catch((errPayload) => {
          toast.error(errPayload.message);
        });
    },
  });

  return (
    <section className="sign mt-all py-5">
      <ToastContainer />
      <div className="container">
        <div>
          <h1 className="fw-bold text-muted">reset your account password</h1>
        </div>

        <div className="row  mt-3">
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email address"
                formik={formik}
                label="Email"
              />
              <InputField
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                formik={formik}
                label="New Password"
              />

              <button
                className="btn fw-bold  btn-success w-100 mt-5"
                type="submit"
              >
                Verfiy {loading && <PulseLoader color="#69ca46" size={10} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewPassword;
