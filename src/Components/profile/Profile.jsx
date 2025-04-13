import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { getUserData } from "../../network/AuthApi";

function Profile() {
  const { userId, userProfileData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData(userId));
  }, [dispatch, userId]);
  return (
    <section className="profile mt-all py-5 position-relative">
      <div className="container">
        <div className="row">
          <h2 className="text-success lh-base">My Profile</h2>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="mt-4">
              <label className="mb-2 text-success fw-medium">Your Name</label>
              <input
                type="text"
                className={`form-control `}
                aria-describedby="myName"
                name="name"
                value={userProfileData?.name}
                disabled
              />
            </div>
            <div className="mt-4">
              <label className="mb-2 text-success fw-medium">Email</label>
              <input
                type="email"
                className={`form-control `}
                aria-describedby="emailHelp"
                name="email"
                value={userProfileData?.email}
                disabled
              />
            </div>
            <div className="mt-4">
              <label className="mb-2 text-success fw-medium">Phone</label>
              <input
                type="tel"
                className={`form-control `}
                aria-describedby="emailHelp"
                name="phone"
                value={userProfileData?.phone}
                disabled
              />
            </div>
            <div className="mt-5 row justify-content-center g-2">
              <div className="col-12 col-md-auto">
                <button
                  onClick={() => navigate("/change-profile-data")}
                  className="btn btn-success fw-bold w-100"
                >
                  update your data <i className="ri-pencil-fill"></i>
                </button>
              </div>
              <div className="col-12 col-md-auto">
                <button
                  onClick={() => navigate("/change-password")}
                  className="btn btn-success fw-bold w-100"
                >
                  change your password <i className="ri-key-2-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
