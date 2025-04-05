import React, { useMemo } from "react";
import "./Wishlist.css";
import { useSelector } from "react-redux";
import { productsSelectors } from "../../reducers/ProductsSlice";
import { wishListSelectors } from "../../reducers/WishlistSlice";
import WishlistCard from "./WishlistCard";
import { ToastContainer } from "react-toastify";
function Wishlist() {
  const allProducts = useSelector(productsSelectors.selectAll);
  const wishListIds = useSelector(wishListSelectors.selectAll);

  const wishlistSet = useMemo(() => new Set(wishListIds), [wishListIds]);

  //Get the products that are in the wishlist.
  const productsInWishlist = useMemo(
    () =>
      allProducts.filter((product) => {
        return wishlistSet.has(product?._id);
      }),
    [wishlistSet, allProducts]
  );

  return (
    <section className="wishlist mt-all p-5">
      <ToastContainer />
      <div className="container">
        <div className="row text-center">
          <div className="col-12 overflow-hidden">
            <i className="ri-heart-fill text-success fs-1"></i>
            <h1>My Wishlist</h1>
          </div>
        </div>

        <div className="row mt-5 align-items-start">
          <div className="col-12 table-responsive">
            {productsInWishlist.length >= 1 ? (
              <table className="table transition">
                <thead className="">
                  <th className="p-3  text-success ">
                    Product Info
                  </th>
                  <th className="p-3 text-center text-success  ">
                    Unit price
                  </th>
                  <th className="p-3  text-success">
                    stock status
                  </th>
                </thead>
                <tbody>
                  {productsInWishlist.map((product) => (
                    <WishlistCard key={product._id} product={product} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="fs-1 fw-medium text-bg-light p-4 text-center">
                Your Wish List is empty <i class="ri-empathize-fill"></i>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;
