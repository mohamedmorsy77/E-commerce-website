import React from "react";
import OrderDetails from "./OrderDetails";

function OrderCard({ order }) {
  return (
    <div className="col-12 mb-4">
      <div className="card shadow-sm p-3">
        <p className="d-inline-flex ">
          <button
            className="btn btn-success"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${order.id}`}
            aria-expanded="false"
            aria-controls={order.id}
          >
            View order details
          </button>
        </p>
        <div className="collapse" id={`${order.id}`}>
          <OrderDetails key={order.id} order={order} />
        </div>

        <h6 className="mt-3 text-success">Products:</h6>
        <ul className="list-group">
          {order.cartItems.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex align-items-center"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="me-3 object-fit-cover rounded-2"
                width="50"
                height="50"
              />
              <div>
                <p className="mb-1 fw-medium">{item.product.title}</p>
                <small className="text-success">
                  Price: ${item.price} | Quantity: {item.count}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderCard;
