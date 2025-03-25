import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPassword } from "../../network/AuthApi";
import { toast, ToastContainer } from "react-toastify";
import { newPasswordSchema } from "../validationSchema/ValidationSchema";
import { useNavigate } from "react-router-dom";
import {PulseLoader} from "react-spinners"
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
    <section className="sign">
      <ToastContainer />
      <div className="container">
        <div>
          <h1 className="fw-bold text-muted">reset your account password</h1>
        </div>

        <div className="row  mt-3">
          <div className="col-12">
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-4">
                <label className="mb-2 fw-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`form-control ${
                    formik.touched.email
                      ? formik.errors.email
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="invalid-feedback d-block">
                  {formik.errors.email}
                </div>
              )}
              <div className="mt-4">
                <label className="mb-2 fw-medium">New Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className={`form-control ${
                    formik.touched.newPassword
                      ? formik.errors.newPassword
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  id="exampleInputPassword1"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.newPassword && formik.touched.newPassword && (
                <div className="invalid-feedback d-block">
                  {formik.errors.newPassword}
                </div>
              )}
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
