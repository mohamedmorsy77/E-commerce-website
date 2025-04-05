import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");

// cash payment
export const createCashOrder = createAsyncThunk(
  "create/create-cash-order",
  async ({ orderId, orderInfo }, { rejectWithValue }) => {
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
        console.log(errorMessage)
      return rejectWithValue(errorMessage);
    }
  }
);

// online cash payment
export const createOnlineCashOrder = createAsyncThunk(
  "create/create-online-cash-order",
  async ({ orderId, orderInfo }, { rejectWithValue }) => {
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
      console.log(response)
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/orders/"
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);
