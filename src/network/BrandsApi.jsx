import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../Api/axios-custom";

export const fetchBrands = createAsyncThunk(
  "brands/fetch-brands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/brands"
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
