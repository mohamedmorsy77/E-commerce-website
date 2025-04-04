import React from "react";

function BrandCard({ brand, onClick }) {
  return (
    <div className="col-6 col-md-4 col-lg-3 mt-3">
      <div className="brands-info" onClick={onClick}>
        <img className="w-100" src={brand.image} alt={brand.name} />
      </div>
    </div>
  );
}

export default BrandCard;
