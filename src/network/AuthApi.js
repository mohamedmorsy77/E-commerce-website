import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../Api/axios-custom";

export const authSignUp = createAsyncThunk(
  "auth/sign-up",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", userData);
      console.log(response.data);
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
      const response = await axiosInstance.post(
        "/auth/forgotPasswords",
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
      const response = await axiosInstance.post("/auth/verifyResetCode", {
        resetCode: resetCode,
      });
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
      const response = await axiosInstance.put(
        "/auth/resetPassword",
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

// Get user data

export const getUserData = createAsyncThunk(
  "get/get-user-data",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Change profile data

export const changeMyProfile = createAsyncThunk(
  "update/my-profile-data",
  async (newProfileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/users/updateMe/",
        newProfileData
      );

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.msg;
      return rejectWithValue(errorMessage);
    }
  }
);

// Change Logged User Password

export const changeMyPassword = createAsyncThunk(
  "update/current-password",
  async (updatePasswordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/users/changeMyPassword",
        updatePasswordData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.errors?.msg;
      return rejectWithValue(errorMessage);
    }
  }
);
