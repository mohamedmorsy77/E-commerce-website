import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Get All Cart 

export const getCart = createAsyncThunk(
  "get/get-cart",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
export const addProductsToCart = createAsyncThunk(
  "Cart/add-product-to-cart",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
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

// Update Product

export const updateProduct = createAsyncThunk(
  "Cart/updateProduct",
  async ({ productId, count }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}?limit=56`, 
        { count },
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
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

// Delete Product

export const deleteProduct = createAsyncThunk(
  "cart/delete-product",
  async (productId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );

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
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
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
