import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";
let cashProduct = {};
export const fetchProducts = createAsyncThunk(
  "products/fetch-products",
  async (page = 1, { rejectWithValue }) => {
    if (cashProduct[page]) {
      return cashProduct[page];
    }

    try {
      const response = await axiosInstance.get(
        `/products?page=${page}`
      );
      cashProduct[page] = response.data;
    
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
