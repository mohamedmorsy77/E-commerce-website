import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { loginSchema } from "../validationSchema/ValidationSchema";
import login from "../../assets/images/signin-g.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../../network/AuthApi";
import InputField from "../reusableInputs/InputField";
import { PulseLoader } from "react-spinners";
function Login() {
  const redirectedRef = useRef(false);
  const [isLoading, SetLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, formikHelper) => {
      SetLoading(true);
      dispatch(authLogin(values)).then((data) => {
        if (data.payload.message === "success") {
          redirectedRef.current = true;
          SetLoading(false);
          setTimeout(() => {
            formikHelper.resetForm();
            navigate("/");
            toast.success("Login successful!");
          }, 500);
        } else {
          SetLoading(false);
          toast.error(data.payload.message);
        }
      });
    },
  });

  return (
    <section className="mt-all py-5">
      <ToastContainer />
      <div className="container">
        <div className="row m- px-4 align-items-center">
          <div className="col-12 col-lg-6 signup-img mt-4 text-center text-lg-start">
            <img className="img-fluid" src={login} alt="sign-up-image" />
          </div>
          <div className="col-12 col-lg-6 mt-4">
            <h2>Sign in to FreshCart</h2>
            <p className="">
              {" "}
              Welcome to FreshCart! Enter your email to get started.
            </p>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email address"
                formik={formik}
              />
              <InputField
                type="password"
                name="password"
                placeholder="****"
                formik={formik}
              />

              <div className="forgetPass d-flex gap-1 mt-3">
                <p className="text-muted">Forgot your password?</p>
                <Link
                  to="/forgetPassword"
                  className="text-success text-decoration-none"
                >
                  reset it
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-success fw-medium w-100 mt-4 d-flex justify-content-center gap-2 align-items-center"
              >
                Login {isLoading && <PulseLoader color="#69ca46" size={10} />}
              </button>
            </form>
            <p className="mt-2">
              By continuing, you agree to our Terms of Service &{" "}
              <span className="text-success fw-medium ">Privacy Policy</span>
            </p>
            <div className="mt-3 fw-medium">
              you dont have any account?{" "}
              <Link
                to="/signup"
                className="text-decoration-none text-success fw-medium"
              >
                Sign up
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
