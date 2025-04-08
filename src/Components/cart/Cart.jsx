import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsSelectors } from "../../reducers/ProductsSlice";
import { cartSelectors, updateProductCount } from "../../reducers/CartSlice";
import CartItem from "./CartItem";
import { toast, ToastContainer } from "react-toastify";
import { deleteAllProduct } from "../../network/CartApi";
import Swal from "sweetalert2";

import "./Cart.css";
import { useNavigate } from "react-router-dom";
function Cart() {
  const navigate = useNavigate();
  const numOfCartItems = useSelector(
    (state) => state.cart.cartInfo?.numOfCartItems || 0
  );
  const totalCartPrice = useSelector(
    (state) => state.cart.cartInfo?.data?.totalCartPrice || 0
  );


  const products = useSelector(productsSelectors.selectAll);
  const cartItems = useSelector(cartSelectors.selectAll);
  const dispatch = useDispatch();

  const mergeProduct = cartItems.map((item) => {
    const productInfo = products.find(
      (product) => product?._id === item.product
    );

    return {
      ...item,
      ...productInfo,
    };
  });

  const handleIncrease = (productId, newCount) => {
    dispatch(updateProductCount({ productId, newCount: newCount + 1 }));
  };

  const handleDecrease = (productId, newCount) => {
    if (newCount > 1) {
      dispatch(updateProductCount({ productId, newCount: newCount - 1 }));
    }
  };

  // handle Confirm Delete
  const handleConfirmDelete = async (callBack) => {
    const result = await Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      callBack();
    }
  };

  // Delet all items in Cart
  const handleDeleteAllProductInCart = () => {
    handleConfirmDelete(async () => {
      try {
        const action = await dispatch(deleteAllProduct()).unwrap();
        toast("All products have been deleted", {
          position: "top-center",
        });
      } catch (err) {
        toast.error(err?.message || " Something went wrong", {
          position: "top-center",
        });
      }
    });
  };
  return (
    <section className="cart py-5 px-3  mt-all">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-8 mt-4">
            <div className="row  rounded-2 shadow-sm p-2">
              <div className="col-12 d-flex text-md-start justify-content-between align-items-center gap-3 flex-wrap">
                <h3>
                  Cart{" "}
                  <span className="text-secondary fs-5">
                    {numOfCartItems > 0
                      ? `(${numOfCartItems} Items in cart)`
                      : "Your Cart is Empty"}
                  </span>
                </h3>
                <button
                  className="btn btn-danger   fw-bold fs-6"
                  onClick={handleDeleteAllProductInCart}
                >
                  x clear cart
                </button>
              </div>
            </div>
            <div className="row mt-3 rounded-2   table-responsive">
              {mergeProduct.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th className="fw-bold p-2">Product</th>
                      <th className="fw-bold p-2">count</th>
                      <th className="fw-bold p-2">price</th>
                      <th className="fw-bold p-2">Update</th>
                      <th className="fw-bold p-2">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mergeProduct &&
                      mergeProduct.map((product) => (
                        <CartItem
                          key={product._id}
                          product={product}
                          handleIncrease={handleIncrease}
                          handleDecrease={handleDecrease}
                          handleConfirmDelete={handleConfirmDelete}
                        />
                      ))}
                  </tbody>
                </table>
              ) : (
                <p className="fs-1 fw-medium text-bg-light p-4 text-center">Your Cart Is Empty</p>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-4">
            <div className="summary p-3 rounded-2  shadow">
              <h4>Total Price: ${totalCartPrice}</h4>
              <button disabled={numOfCartItems === 0} className="btn btn-dark mt-3 w-100 fw-bold" onClick={() => navigate("/checkout")}>
                Continue to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
