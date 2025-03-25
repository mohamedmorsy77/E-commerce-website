import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const token = localStorage.getItem("token");
export const addProductToWishlist = createAsyncThunk(
  "add/add-Product-To-Wishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        {
          headers: {
            token: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something is wronk";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  "delete/delete-Product-From-Wishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,

        {
          headers: {
            token: token,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err)
      const errorMessage = err.response?.data?.message || "Something is wronk";
      return rejectWithValue(errorMessage);
    }
  }
);
