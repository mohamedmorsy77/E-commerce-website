import React, {  useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromWishlist } from "../../network/Wishlist";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { addProductsToCart } from "../../network/CartApi";
function WishlistCard({ product }) {
  const { wishlistLoadingIds } = useSelector((state) => state.wishlist);
  const { addProductToCartloadingIds } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useMemo(
    () => wishlistLoadingIds.includes(product._id),
    [product._id, wishlistLoadingIds]
  );
  const productLoading = useMemo(
    () => addProductToCartloadingIds.includes(product._id),
    [product._id, addProductToCartloadingIds]
  );
  const handleAction = async (actionMethod, successMessage) => {
    try {
      const action = await dispatch(actionMethod(product._id)).unwrap();
      toast.success(action?.message || successMessage, {
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
  const handleDelete = async () =>
    handleAction(
      deleteProductFromWishlist,
      "Product removed successfully to your wishlist"
    );

  const addProductToCard = () =>
    handleAction(addProductsToCart , "Added to cart successfully!");

  return (
    <tr className="transition">
      <td className="d-inline-flex align-items-center gap-3 py-2 overflow-hidden">
        <img src={product.imageCover} alt="flflf" />
        <div className="product-info overflow-hidden ">
          <h4 className="text-success">{product.category.name}</h4>
          <p className="m-0 mt-2 text-truncate" title={product.title}>{product.title}</p>
        </div>
      </td>
      <td className="text-center">
        <span className="fw-medium">${product.price}</span>
      </td>
      <td className="d-flex align-items-center gap-2   gap-xl-5">
        <span
          className={`fw-bold ${
            product.quantity >= 1 ? "text-success" : "text-danger"
          }`}
        >
          {product.quantity >= 1 ? "In Stock" : "Out Of Stock"}
        </span>
        <div className="d-flex gap-2">
          <button
            aria-label="Add Product to Cart"
            className="btn btn-dark"
            onClick={addProductToCard}
          >
            {productLoading ? (
              <PulseLoader color="#69ca46" size={4} />
            ) : (
              <span>
                <i class="ri-shopping-cart-2-line"></i>
              </span>
            )}
          </button>
          <button
            aria-label="Remove Product From Wishlist"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            {isLoading ? (
              <PulseLoader color="#69ca46" size={4} />
            ) : (
              <i class="ri-delete-bin-6-line"></i>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default WishlistCard;
