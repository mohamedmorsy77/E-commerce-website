import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import signUp from "../../assets/images/signup-g.svg";
import { registerSchema } from "../validationSchema/ValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSignUp } from "../../network/AuthApi";
import InputField from "../reusableInputs/InputField";
import { PulseLoader } from "react-spinners";
function SignUp() {
  const { loading } = useSelector((state) => state.auth);
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
    onSubmit: async (values, formikHelper) => {
      try {
        const data = await dispatch(authSignUp(values)).unwrap();
        if (data.message === "success") {
          formikHelper.resetForm();
          setTimeout(() => {
            toast.success("Registration successful");
          }, 100);
          navigate("/");
        }
      } catch (error) {
        toast.error(
          error && error.message ? error.message : "Account Already Exists"
        );
      }
    },
  });
  return (
    <section className="sign mt-all py-2">
  

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
                label="User Name"
              />
              <InputField
                type="email"
                name="email"
                placeholder="Enter your email address"
                formik={formik}
                label="Email"
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                formik={formik}
                label="Password"
              />
              <InputField
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                formik={formik}
                label="RePassword"
              />
              <InputField
                type="text"
                placeholder="Phone Number"
                name="phone"
                formik={formik}
                label="Phone"
              />

              <button
                type="submit"
                className="btn btn-success fw-medium w-100 mt-4"
              >
                Register {loading && <PulseLoader color="#69ca46" size={10} />}
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
