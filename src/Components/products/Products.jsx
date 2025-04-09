import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";



import { fetchProducts } from "../../network/ProductApi";
import { productsSelectors } from "../../reducers/ProductsSlice";
import ProductsCard from "./ProductsCard";
import { ToastContainer } from "react-toastify";
import SkeletonCard from "../skeletonCard/SkeletonCard";
function Products() {
  const products = useSelector(productsSelectors.selectAll);
  const { loading } = useSelector((state) => state.products);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const popularProducts = useMemo(() => {
    return (
      products && products.filter((product) => product.ratingsQuantity > 30)
    );
  }, [products]);

  return (
    <section className="products overflow-hidden py-5">
      <ToastContainer />
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-12">
            <h3 className="text-success fw-medium mb-4">
              Shop Popular Products
            </h3>
          </div>
        </div>

        <div className="row m-0">
          {loading
            ? Array.from({ length: popularProducts.length }).map((_, i) => (
                <SkeletonCard key={i + 1} />
              ))
            : popularProducts.map((product,i) => (
                <ProductsCard
                  key={product["_id"]}
                  product={product}
                  slider={false}
                  index = {i}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
