import { useFormik } from "formik";
import { changeLoggedUserPassword } from "../validationSchema/ValidationSchema";
import InputField from "../reusableInputs/InputField";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { changeMyPassword } from "../../network/AuthApi";

function Profile() {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },

    validationSchema: changeLoggedUserPassword,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, formikHelper) => {
      try {
        const result = await dispatch(changeMyPassword(values)).unwrap();
        if (result.message === "success") {
         
          setTimeout(() => {
            toast.success("Your password has been updated successfully", {
              position: "top-center",
              autoClose: 3000,
              pauseOnHover: false,
              closeOnClick: true,
              draggable: true,
            });
            navigate("/");
          }, 500);

          formikHelper.resetForm();
        }
      } catch (err) {
        toast.error(err ? err : "E-mail already in use", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
        });
      }
    },
  });

  return (
    <section className="profile mt-all py-5 position-relative">
      <div className="container">
        <div className="row text-center">
          <h2 className="text-success lh-base">Update Password</h2>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 m-lg-auto">
            <form onSubmit={formik.handleSubmit}>
              <InputField
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                formik={formik}
                label="Your Current Password"
              />
              <InputField
                type="password"
                name="password"
                placeholder="Enter Your Password"
                formik={formik}
                label="New Password"
              />
              <InputField
                type="password"
                placeholder="Enter Your Password"
                name="rePassword"
                formik={formik}
                label="Your rePassword"
              />
              <Link to="/forgetPassword" className="text-success fw-meduim mt-4 d-block">
                Forget Password
              </Link>
              <div className="mt-3 row justify-content-center g-2">
                <div className="col-12 col-md-6">
                  <button className="btn btn-success flex-grow-1 fw-bold w-100">
                    update <i className="ri-pencil-fill"></i>{" "}
                    {loading && <PulseLoader color="#69ca46" size={10} />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
