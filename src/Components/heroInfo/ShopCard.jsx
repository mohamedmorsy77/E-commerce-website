import React from "react";
import { Link } from "react-router-dom";

function ShopCard({ title, description, code, buttonText, link }) {
  return (
    <div className="p-4 flex-grow-1 rounded-4">
      <h2 className="text-dark fs-2">
        {title}
      </h2>
      <p className="mt-3 fw-medium text-muted">{description}</p>
      <span className="mt-3 text-muted fs-5">
        Code: <strong className="fs-4">{code}</strong>
      </span>
      <Link
        to={link}
        className="mt-4 btn btn-dark fw-bold text-decoration-none d-block w-50"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default ShopCard;
