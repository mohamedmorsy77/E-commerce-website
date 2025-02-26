import React from "react";
import './AuthSpinner.css'
function AuthSpinner() {
  return (
    <div className="loading-container d-flex align-items-center justify-content-center">
      <span className="loader"></span>
    </div>
  );
}

export default AuthSpinner;
