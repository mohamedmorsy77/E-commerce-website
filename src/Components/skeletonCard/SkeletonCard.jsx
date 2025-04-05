import React from "react";
import './Skeleton.css'
function SkeletonCard() {
  return (
    <div className="skeleton-item col-12 col-sm-6 col-md-4 col-xl-3 mt-5">
      <div className="card p-3 rounded-2">
        <div className="skeleton h-200 w-100 mb-3 rounded-2 bg-light"></div>
        <div className="skeleton h-20 w-75 mb-2 rounded-2 bg-light"></div>
        <div className="skeleton h-20 w-50 mb-2 rounded-2 bg-light"></div>
        <div className="skeleton h-20 w-100 mb-2 rounded-2 bg-light"></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
