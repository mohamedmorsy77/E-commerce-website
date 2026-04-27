import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";

// cash payment
export const createCashOrder = createAsyncThunk(
  "create/create-cash-order",
  async ({ cartId, orderInfo }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/orders/${cartId}`, {
        shippingAddress: orderInfo,
      });

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
    try {
      const response = await axiosInstance.post(
        `/orders/checkout-session/${cartId}?url=https://electrafit7.netlify.app/%23`,
        { shippingAddress: orderInfo }
      );
      console.log(response.data);
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
      const response = await axiosInstance.get(`/user/${userId}`);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);
