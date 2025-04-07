import { Star } from "lucide-react";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateProduct } from "../../network/CartApi";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartItem({
  product,
  handleDecrease,
  handleIncrease,
  handleConfirmDelete,
}) {
  const { updateCartLoadingIds } = useSelector((state) => state.cart);
  const { deleteCartLoadingIds } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isLoading = useMemo(
    () => updateCartLoadingIds.includes(product._id),
    [product._id, updateCartLoadingIds]
  );
  const LoadingWithDelete = useMemo(
    () => deleteCartLoadingIds.includes(product._id),

    [product._id, deleteCartLoadingIds]
  );

  

  // Deletion
  const handleDelete = (id) => {
    handleConfirmDelete(async () => {
      try {
        const action = await dispatch(deleteProduct(id)).unwrap();
        toast(action?.message || "Product deleted successfully", {
          position: "top-center",
        });
      } catch (err) {
        toast.error(err?.message || " Something went wrong", {
          position: "top-center",
        });
      }
    });
  };

  // update
  const handleUpdate = async (newCount) => {
    try {
      const action = await dispatch(updateProduct(newCount)).unwrap();
      toast(action.message || "Product updated successfully", {
        position: "top-center",
      });
    } catch (err) {
      toast.error(err?.message || " Something went wrong", {
        position: "top-center",
      });
    }
  };

  return (
    <tr key={product._id} className="w-100 border-bottom bg-white rounded-3 ">
      <td colSpan="5" className="d-inline-flex align-items-center gap-2">
        <img
          className="cart-image object-fit-contain"
          src={product.imageCover}
          alt="product-image"
        />
        <div className="cart-info">
          <p className="m-0 text-success ">{product.category.name}</p>
          <span className="m-0 d-flex align-items-center gap-2">
            {product.ratingsAverage}
            <Star
              className="w-5 h-5 fs-6 fill-current text-warning "
              fill="currentColor"
            />
          </span>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => handleDecrease(product._id, product.count)}
            className="btn btn-outline-secondary fw-bold btn-sm"
          >
            -
          </button>
          <span>{product.count}</span>
          <button
            onClick={() => handleIncrease(product._id, product.count)}
            className="btn btn-outline-secondary fw-bold btn-sm"
          >
            +
          </button>
        </div>
      </td>
      <td>
        $
        {product.priceAfterDiscount
          ? product.priceAfterDiscount
          : product.price}
      </td>
      <td>
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={() =>
            handleUpdate({ productId: product._id, count: product.count })
          }
        >
          Update {isLoading && <PulseLoader color="#69ca46" size={5} />}
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(product._id)}
        >
          Delete {LoadingWithDelete && <PulseLoader color="#69ca46" size={5} />}
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
