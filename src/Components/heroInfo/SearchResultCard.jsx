import React from "react";
import { useNavigate } from "react-router-dom";

function SearchResultCard({product}) {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`productDetails/${product._id}`)} className="product-info  mb-3 d-flex rounded-3  align-items-start gap-3 px-4 py-2">
      <img
        className=" object-fit-cover"
        src={product.imageCover}
        width={80}
        height={80}
        alt="ddd"
      />
      <div>
        <h3 className="fs-6 m-0 text-success fw-bold">{product.title}</h3>
        <p className="m-0 mt-2 text-muted">{product.category.name}</p>
        <p className="m-0 text-muted">{product.brand.name}</p>
      </div>
    </div>
  );
}

export default SearchResultCard;
