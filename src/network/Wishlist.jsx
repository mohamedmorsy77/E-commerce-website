import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";

// Get All Carts

export const getLoggedUserWishlist = createAsyncThunk(
  "get/get-logged-user-wishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/wishlist");

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something is wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "add/add-Product-To-Wishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/wishlist", { productId });

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something is wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  "delete/delete-Product-From-Wishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/wishlist/${productId}`);

      return response.data;
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "Something is wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
