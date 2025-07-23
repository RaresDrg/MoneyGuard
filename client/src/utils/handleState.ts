import { PayloadAction } from "@reduxjs/toolkit";
import type {
  AuthState,
  TransactionsState,
  TransactionPayloadResponse,
  ErrorResponse,
  User,
} from "../App.types";

export const utils = {
  handlePending(state: AuthState | TransactionsState) {
    state.isLoading = true;
  },
  handleRejected(
    state: AuthState | TransactionsState,
    action: PayloadAction<unknown>
  ) {
    state.isLoading = false;
    state.error =
      (action.payload as ErrorResponse)?.response?.data?.message ||
      "Internal server error";
  },
  handleFulfilled(state: AuthState | TransactionsState) {
    state.isLoading = false;
    state.error = null;
  },
  handleAuth(
    state: AuthState,
    action: PayloadAction<{ data: { user: User } }>
  ) {
    state.isLoading = false;
    state.error = null;
    state.isLoggedIn = true;
    state.user = { ...action.payload.data.user };
  },
  handleLogout(state: AuthState) {
    state.isLoggedIn = false;
    state.user = null;
  },
  handleTransactions(
    state: TransactionsState,
    action: PayloadAction<TransactionPayloadResponse>
  ) {
    state.isLoading = false;
    state.error = null;
    state.balance = action.payload.data.balance;
    state.transactionsList = action.payload.data.transactionslist;
  },
};
