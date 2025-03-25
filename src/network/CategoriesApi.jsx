import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetch-categories",
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
    
      return response.data;
    } catch (err) {
       return rejectWithValue(err.response.data)
    }
  }
);
