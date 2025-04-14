import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        userData
      );
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

// Get user data

export const getUserData = createAsyncThunk(
  "get/get-user-data",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/users/${userId}`
      );

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
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
        newProfileData ,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );
    
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.msg;
      return rejectWithValue(errorMessage);
    }
  })

// Change Logged User Password

export const changeMyPassword = createAsyncThunk(
  "update/current-password",
  async (updatePasswordData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        updatePasswordData ,
        {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.errors?.msg;
      return rejectWithValue(errorMessage);
    }
  })
