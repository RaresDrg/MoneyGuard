import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import type { AuthState } from "../../App.types";
import { utils } from "../../utils/handleState";
import { register, login, logout, changePassword } from "./operations";

const initialState: AuthState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    forceLogout(state) {
      utils.handleLogout(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // *Register
      .addCase(register.pending, utils.handlePending)
      .addCase(register.rejected, utils.handleRejected)
      .addCase(register.fulfilled, utils.handleAuth)
      // *Login
      .addCase(login.pending, utils.handlePending)
      .addCase(login.rejected, utils.handleRejected)
      .addCase(login.fulfilled, utils.handleAuth)
      // *Logout
      .addCase(logout.pending, utils.handlePending)
      .addCase(logout.rejected, (state, action) => {
        utils.handleRejected(state, action);
        utils.handleLogout(state);
      })
      .addCase(logout.fulfilled, (state) => {
        utils.handleFulfilled(state);
        utils.handleLogout(state);
      })
      // *Change Password
      .addCase(changePassword.pending, utils.handlePending)
      .addCase(changePassword.rejected, utils.handleRejected)
      .addCase(changePassword.fulfilled, utils.handleAuth);
  },
});

export const { forceLogout } = authSlice.actions;

export const authReducer = persistReducer(
  { key: "auth", storage: storageSession, whitelist: ["isLoggedIn", "user"] },
  authSlice.reducer
);
