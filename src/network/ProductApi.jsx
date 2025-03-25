import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
let cashProduct = {};
export const fetchProducts = createAsyncThunk(
  "products/fetch-products",
  async (page = 1, { rejectWithValue }) => {
    if (cashProduct[page]) {
      return cashProduct[page];
    }

    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?page=${page}`
      );
      cashProduct[page] = response.data;
      // localStorage.setItem("cashProduct", JSON.stringify(cashProduct));
      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);
