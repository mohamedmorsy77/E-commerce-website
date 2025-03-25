import { createSlice } from "@reduxjs/toolkit";
import {
  authLogin,
  authResetCode,
  authResetPassword,
  authSignUp,
  createNewPassword,
} from "../network/AuthApi";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || "",
    loading: null,
    error: null,
    status: null,
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
        console.log(action);
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(authSignUp.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error.message;
        state.status = action.payload.message;
      })
      .addCase(authLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
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
        console.log(state.status);
        state.loading = false;
      })
      .addCase(authResetCode.rejected, (state, action) => {
        console.log(action);
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
        console.log(action);
        state.loading = false;
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
};

export default authSlice.reducer;
