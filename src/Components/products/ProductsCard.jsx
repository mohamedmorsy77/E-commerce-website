import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import ReviewProduct from "../review/ReviewProduct";
import { addProductsToCart } from "../../network/CartApi";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { addProductToWishlist } from "../../network/Wishlist";
function ProductsCard({ product, slider, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { addProductToCartloadingIds } = useSelector((state) => state.cart);
  const { wishlistLoadingIds } = useSelector((state) => state.wishlist);
  const wishlistLoading = useMemo(
    () => wishlistLoadingIds.includes(product?._id),
    [product?._id, wishlistLoadingIds]
  );
  const isLoading = useMemo(
    () => addProductToCartloadingIds.includes(product?._id),
    [product?._id, addProductToCartloadingIds]
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fullStar = Math.floor(product?.ratingsAverage);
  const halfStar = product?.ratingsAverage % 1 >= 0.5;
  const emptystar = 5 - fullStar - halfStar;
  const discount = product?.priceAfterDiscount
    ? Math.floor(
        ((product.priceAfterDiscount - product.price) / product.price) * 100
      )
    : null;

  const handleAction = async (actionMethod, messageSuccess) => {
    try {
      const action = await dispatch(actionMethod(product._id)).unwrap();
      toast.success(action.message || messageSuccess, {
        position: "top-center",
      });
    } catch (err) {
      navigate("/login");
      setTimeout(() => {
        toast.error(
          err || "You are not logged in. Please login to get access",
          {
            position: "top-center",
          }
        );
      }, 500);
    }
  };

  const handleAddToCart = () =>
    handleAction(addProductsToCart, "Added to cart successfully!");

  const handleWishList = () =>
    handleAction(addProductToWishlist, "Added to wishlist successfully!");
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ delay: index * 0.1, ease: "easeIn", duration: 0.5 }}
      className={` col-sm-6 col-md-4 col-xl-3 mt-5 ${slider ? "w-100" : ""}`}
    >
      <div className="best-sellers product-item transition border-1  card rounded-2 position-relative">
        {discount ? (
          <div className="sale d-flex align-items-center justify-content-center bg-danger px-3 py-2 rounded-2 text-white fw-medium position-absolute">
            {discount}%
          </div>
        ) : null}
        <div className="product-action transition d-flex position-absolute flex-column gap-2">
          <button
            onClick={handleWishList}
            title="wishList"
            className="btn transition"
          >
            <i
              className={`ri-heart-line  d-block ${
                wishlistLoading ? "active-heart" : ""
              }`}
            ></i>
          </button>
        </div>
        <div
          className="product-image  w-100"
          onClick={() => navigate(`/productDetails/${product["_id"]}`)}
        >
          <img
            src={product.imageCover}
            className="w-100 h-100 object-fit-contain"
            alt={product.title}
            loading="lazy"
          />
        </div>
        <div className="card-body p-3">
          <div  onClick={() => navigate(`/productDetails/${product["_id"]}`)}>
            {" "}
            <h4 className="text-success">{product?.category?.name}</h4>
            <span
              title={product?.title}
              className="fw-medium product-title text-black text-truncate d-block  "
            >
              {product?.title}
            </span>
            <ReviewProduct
              product={product}
              fullStar={fullStar}
              halfStar={halfStar}
              emptystar={emptystar}
            />
          </div>
          <div className="price mt-4 d-flex justify-content-between align-items-center">
            {product?.priceAfterDiscount ? (
              <div className="d-flex align-items-center">
                <p className="text-danger fw-bold  m-0">
                  ${product.priceAfterDiscount}
                </p>
                <p className="text-secondary text-decoration-line-through fw-small ms-1 m-0">
                  ${product.price}
                </p>
              </div>
            ) : (
              <span className="text-danger fw-bold me-1">
                ${product?.price}
              </span>
            )}
            <span
              className={`stock fw-medium ${
                product?.quantity > 0 ? "text-success" : "text-danger"
              }`}
            >
              {product?.quantity > 0 ? "IN STOCK" : "Out Of Stock"}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="btn transition btn-success mt-4 fw-bold w-100 rounded-2 add-to-cart"
          >
            Add To Cart {isLoading && <PulseLoader color="#69ca46" size={10} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default React.memo(ProductsCard);
