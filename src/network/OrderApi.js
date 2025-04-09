import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// cash payment
export const createCashOrder = createAsyncThunk(
  "create/create-cash-order",
  async ({ orderId, orderInfo }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${orderId}`,
        { orderInfo },
        {
          headers: {
            token: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
        
      return rejectWithValue(errorMessage);
    }
  }
);

// online cash payment
export const createOnlineCashOrder = createAsyncThunk(
  "create/create-online-cash-order",
  async ({ orderId, orderInfo }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${orderId}?url=http://localhost:3000`,
        { shippingAddress: orderInfo },
        {
          headers: {
            token: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Get All Orders

export const getAllOrders = createAsyncThunk(
  "Get/get-all-orders",
  async (cartOwner, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`
      );
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);
