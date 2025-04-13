import React from "react";
import './Categories.css'
import { useParams } from "react-router-dom";
import { categoriesSelectors } from "../../reducers/CategoriesSlice";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../reducers/ProductsSlice";
import ProductsCard from "../products/ProductsCard";


function SpecificCategory() {
  const { id } = useParams();
  const categoryInfo = useSelector((state) =>
    categoriesSelectors.selectById(state, id)
  );
  const products = useSelector(productsSelectors.selectAll);

  // Filter products based on the category id
  const filteredProducts = products.filter(
    (product) => product.category._id === id
  );
  

  return (
    <section className="products specific-category py-5 px-3 mt-all">
     
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="cat-image position-relative d-flex align-items-center justify-content-center">
              <img
                src={categoryInfo.image}
                className=" img-fluid h-100 object-fit-contain"
                alt={categoryInfo.name}
              />
            </div>
          </div>
          <div className="col-12 mt-4">
            <h1 className="fw-medium text-center">
              <span className="text-success">Category Name:</span>{" "}
              <span>{categoryInfo.name}</span>
            </h1>
          </div>
        </div>
        <div className="row overflow-hidden">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductsCard
                key={product["_id"]}
                product={product}
                slider={false}
              />
            ))
          ) : (
            <div className="text-center mt-5 fw-bold fs-2">
              Sorry , No products by this name for now{" "}
              <i className="ri-emotion-sad-fill text-warning fs-1"></i>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default SpecificCategory;
