
import { useFormik } from "formik";
import { changeProfileDataSchema } from "../validationSchema/ValidationSchema";
import InputField from "../reusableInputs/InputField";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { changeMyProfile } from "../../network/AuthApi";

function Profile() {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },

    validationSchema: changeProfileDataSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values, formikHelper) => {
      try {
        const result = await dispatch(changeMyProfile(values)).unwrap();
        console.log(result);
        if (result.message === "success") {
         setTimeout(() => {
            toast.success("Your Profile Data Updated", {
                position: "top-center",
                autoClose: 3000,
                pauseOnHover: false,
                closeOnClick: true,  
                draggable: true, 
              });
         }, 300)
          navigate("/")
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
          <h2 className="text-success lh-base">Update Profile</h2>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 m-lg-auto">
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
                type="text"
                placeholder="Phone Number"
                name="phone"
                formik={formik}
                label="Phone"
              />
              <div className="mt-3 row justify-content-center g-2">
                <div className="col-12 col-md-6">
                  <button className="btn btn-success flex-grow-1 fw-bold w-100">
                  update <i className="ri-pencil-fill"></i>  {loading && <PulseLoader color="#69ca46" size={10} />}
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
