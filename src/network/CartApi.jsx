import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";

// Get All Cart

export const getCart = createAsyncThunk(
  "get/get-cart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/cart");
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something is wronk";
      return rejectWithValue(errorMessage);
    }
  }
);
export const addProductsToCart = createAsyncThunk(
  "Cart/add-product-to-cart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/cart", { productId });

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Update Product

export const updateProduct = createAsyncThunk(
  "Cart/updateProduct",
  async ({ productId, count }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}?limit=56`,
        { count }
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete Product

export const deleteProduct = createAsyncThunk(
  "cart/delete-product",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/${productId}`);

      console.log(response.data);
      return response.data || { message: "Product deleted successfully" };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete All Product
export const deleteAllProduct = createAsyncThunk(
  "cart/delete-all-product",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart`);

      console.log(response.data);
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
