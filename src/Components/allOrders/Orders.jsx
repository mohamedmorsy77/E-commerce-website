import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getAllOrders } from "../../network/OrderApi";
import { orderSelectors } from "../../reducers/OrderSlice";
import OrderCard from "./OrderCard";
import AuthSpinner from "../spinner/authSpinner/AuthSpinner";
import Loading from "../spinner/loading/Loading";

function Orders() {
  const allOrders = useSelector(orderSelectors.selectAll);
  const { loading } = useSelector((state) => state.orders);
  console.log(allOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <section className="mt-all py-5">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-success mb-4">
              <i className="ri-shopping-bag-3-line"></i> My Orders
            </h2>
          </div>

          {loading ? (
            <Loading />
          ) : allOrders?.length > 0 ? (
            allOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <div className="col-12">
              <p className="text-muted text-center">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Orders;
