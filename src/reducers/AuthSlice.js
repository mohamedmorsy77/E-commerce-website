import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  authResetCode,
  authResetPassword,
  authSignUp,
  changeMyPassword,
  changeMyProfile,
  createNewPassword,
  getUserData,
} from "../network/AuthApi";
import { jwtDecode } from "jwt-decode";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    userId: localStorage.getItem("userId") || "",
    loading: null,
    error: null,
    status: null,
    userProfileData: localStorage.getItem("user-profile-data") || {},
  },
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.token = "";
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(authSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        console.log(action.payload);
      })
      .addCase(authSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.status = action.payload.message;
      })
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        const decode = jwtDecode(action.payload.token);
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.userId = decode.id;
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("userId", state.userId);
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(authResetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(authResetPassword.fulfilled, (state, action) => {
        state.status = action.payload.message;
        state.loading = false;
      })
      .addCase(authResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(authResetCode.pending, (state) => {
        state.loading = false;
      })
      .addCase(authResetCode.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.status = action.payload.status;
        } else {
          state.status = action.payload.message;
        }

        state.loading = false;
      })
      .addCase(authResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createNewPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createNewPassword.rejected, (state, action) => {
        state.loading = false;
      })
      // Get user data
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log(action.payload);
        const { email, name, phone } = action.payload.data;
        state.userProfileData = { email, name, phone };
        localStorage.setItem(
          "user-profile-data",
          JSON.stringify(state.userProfileData)
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile Data
      .addCase(changeMyProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeMyProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(state.user));
        state.loading = false;
        state.error = "";
      })
      .addCase(changeMyProfile.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Update Current Password
      .addCase(changeMyPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeMyPassword.fulfilled, (state, action) => {
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        state.loading = false;
        state.error = "";
        state.token= "";
        state.user = ""
      })
      .addCase(changeMyPassword.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export {
  authSignUp,
  authLogin,
  authResetPassword,
  authResetCode,
  createNewPassword,
  changeMyProfile,
  changeMyPassword,
};

export default authSlice.reducer;
