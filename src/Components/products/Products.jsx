import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";

import Loading from "../spinner/loading/Loading";

import { fetchProducts } from "../../network/ProductApi";
import { productsSelectors } from "../../reducers/ProductsSlice";
import ProductsCard from "./ProductsCard";
import { ToastContainer } from "react-toastify";
function Products() {
  const products = useSelector(productsSelectors.selectAll);
  const { loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const popularProducts =
    products && products.filter((product) => product.ratingsQuantity > 18);

  return (
    <section className="products py-5">
      <ToastContainer />
      <div className="container">
        <div className="row m-0">
          <div className="col-12">
            <h3 className="text-success fw-medium mb-4">
              Shop Popular Products
            </h3>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row m-0">
            {popularProducts.map((product) => (
              <ProductsCard
                key={product["_id"]}
                product={product}
                slider={false}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
