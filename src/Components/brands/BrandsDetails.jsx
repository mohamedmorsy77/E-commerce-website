import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductsCard from "../products/ProductsCard";
import { brandsSelectors } from "../../reducers/BrandsSlice";
import { productsSelectors } from "../../reducers/ProductsSlice";


function BrandsDetails() {
  const { id } = useParams();
  const brandInfo = useSelector((state) =>
    brandsSelectors.selectById(state, id)
  );
  const products = useSelector(productsSelectors.selectAll);

  // Filter products based on the category id
  const filteredProductsBrands = products.filter(
    (product) => product.brand["_id"] === id
  );
  

  return (
    <section className="products specific-category py-5 px-3 mt-all">
   
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="brand-image shadow position-relative d-flex align-items-center justify-content-center">
              <img
                src={brandInfo.image}
                className="h-100 object-fit-contain"
                alt={brandInfo.name}
              />
            </div>
          </div>
          <div className="col-12 mt-4">
            <h1 className="fw-medium text-center">
              <span className="text-success">Brand Name:</span>{" "}
              <span>{brandInfo.name}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          {filteredProductsBrands.length > 0 ? (
            filteredProductsBrands.map((product) => (
              <ProductsCard
                key={product["_id"]}
                product={product}
                slider={false}
              />
            ))
          ) : (
            <div className="text-center mt-5 fw-bold fs-2">
              Sorry , No products by this name for now{" "}
              <i class="ri-emotion-sad-fill text-warning fs-1"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default BrandsDetails;
