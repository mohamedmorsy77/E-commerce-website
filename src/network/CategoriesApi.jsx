import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";

export const fetchCategories = createAsyncThunk(
  "categories/fetch-categories",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get(
        "/categories"
      );
    
      return response.data;
    } catch (err) {
       return rejectWithValue(err.response.data)
    }
  }
);
