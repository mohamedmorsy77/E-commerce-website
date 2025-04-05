import { Star } from "lucide-react";
import React from "react";

function ReviewProduct({ product, fullStar, halfStar, emptystar }) {
  return (
    <div className="reviews d-flex align-items-center  mt-3">
      <div className="rate d-flex align-items-center">
        {Array.from({ length: fullStar }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 fill-current text-warning"
            fill="currentColor"
          />
        ))}

        {halfStar && (
          <div className="position-relative m-0 overflow-hidden">
            <Star className="w-5 h-5 fill-current text-secondary overflow-hidden" />
            <div className="half-star text-warning">
              <Star className="w-5 h-5" fill="currentColor" />
            </div>
          </div>
        )}
        {Array.from({ length: emptystar }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5 text-secondary" />
        ))}
        <span className="ms-2 text-secondary">{product.ratingsAverage}</span>
      </div>
      <span className="reviewer fw-medium  text-secondary text-success">
        ({product.ratingsQuantity})
      </span>
    </div>
  );
}

export default ReviewProduct;
