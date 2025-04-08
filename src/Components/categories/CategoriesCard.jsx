import React from "react";
import "./Categories.css";
function CategoriesCard({ category, onClick }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3 mt-5">
      <div
        onClick={onClick}
        className="category-item d-flex transition  flex-column align-items-center gap-2 "
      >
        <div className="category-image w-100 d-flex justify-content-center">
          <img
            className="img-fluid rounded-4 transition"
            src={`${category.image}?width=240&height=200`}
            alt={category.name}
          />
        </div>
        <h5 className="text-center mt-3 text-success">{category.name}</h5>
      </div>
    </div>
  );
}

export default React.memo(CategoriesCard);
