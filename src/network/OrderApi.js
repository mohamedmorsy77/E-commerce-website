import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// cash payment
export const createCashOrder = createAsyncThunk(
  "create/create-cash-order",
  async ({ cartId, orderInfo }, { rejectWithValue }) => {
   
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress: orderInfo },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
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
  async ({ cartId, orderInfo }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://electrafit7.netlify.app/%23`,
        { shippingAddress: orderInfo },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log(response.data) 
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
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);




