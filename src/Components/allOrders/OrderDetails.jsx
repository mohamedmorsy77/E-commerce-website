import React from "react";

function OrderDetails({order}) {
  return (
    <div className="card card-body">
      <h5 className="mb-2">Order ID: {order.id}</h5>
      <p className="text-muted">
        <strong>Order Time:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Payment Method:</strong> {order.paymentMethodType}
      </p>
      <p>
        <strong>Total Price:</strong> ${order.totalOrderPrice}
      </p>
      <p className={`text-${order.isPaid ? "success" : "danger"}`}>
        <strong>Paid:</strong> {order.isPaid ? "Yes" : "No"}
      </p>
      <p className={`text-${order.isDelivered ? "success" : "danger"}`}>
        <strong>Delivered:</strong> {order.isDelivered ? "Yes" : "No"}
      </p>
    </div>
  );
}

export default OrderDetails;
