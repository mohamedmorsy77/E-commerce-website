import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import signUp from "../../assets/images/signup-g.svg";
import { registerSchema } from "../validationSchema/ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../network/AuthApi";
import InputField from "../reusableInputs/InputField";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: registerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, formikHelper) => {
      dispatch(authSignUp(values)).then((data) => {
        if (data.payload.message === "success") {
          setTimeout(() => {
            toast.success("Register successful!");
          }, 100);
          formikHelper.resetForm();
          navigate("/login");
        } else {
          toast.error(data.payload.message);
        }
      });
    },
  });
  return (
    <section className="sign mt-all py-2">
      <ToastContainer />
      <div className="container">
        <div className="row m- px-4 align-items-center">
          <div className="col-12 col-lg-6  signup-img text-center text-lg-center mt-4">
            <img className="img-fluid" src={signUp} alt="sign-up-image" />
          </div>
          <div className="col-12 col-lg-6 mt-4">
            <h2>Get Start Shopping</h2>
            <p className="">
              {" "}
              Welcome to FreshCart! Enter your email to get started.
            </p>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="text"
                name="name"
                placeholder="Enter your Name"
                formik={formik}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email address"
                formik={formik}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                formik={formik}
              />
              <InputField
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                formik={formik}
              />
              <InputField
                type="text"
                placeholder="Phone Number"
                name="phone"
                formik={formik}
              />

              <button
                type="submit"
                className="btn btn-success fw-medium w-100 mt-4"
              >
                Register
              </button>
            </form>
            <p className="mt-2">
              By continuing, you agree to our Terms of Service &{" "}
              <span className="text-success fw-medium ">Privacy Policy</span>
            </p>
            <div className="mt-3 fw-medium">
              you have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none text-success fw-medium"
              >
                Sign In
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
