import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../App.types";

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setAuthenticatedUser(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    updateUserBalance(state, action: PayloadAction<number>) {
      if (state.user) state.user.balance = action.payload;
    },
  },
});

export const { actions, reducer } = authSlice;
