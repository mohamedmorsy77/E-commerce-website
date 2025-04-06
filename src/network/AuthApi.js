import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addProductsToCart } from "./CartApi";

export const authSignUp = createAsyncThunk(
  "auth/sign-up",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        userData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (yourEmail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        yourEmail
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const authResetCode = createAsyncThunk(
  "auth/resetCode",
  async (resetCode, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: resetCode }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createNewPassword = createAsyncThunk(
  "auth/createNewPassword",
  async (newPassword, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        newPassword
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);
