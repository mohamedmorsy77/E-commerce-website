import React from "react";
import "../Spinner.css";
function Loading() {
  return (
    <div className="container p-5 d-flex align-items-center justify-content-center">
      <span className="loading"></span>
    </div>
  );
}

export default Loading;
