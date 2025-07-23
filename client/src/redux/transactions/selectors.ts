import type { RootState } from "../../App.types";

export const selectIsLoading = (state: RootState) =>
  state.transactions.isLoading;

export const selectBalance = (state: RootState) => state.transactions.balance;

export const selectTransactionsList = (state: RootState) =>
  state.transactions.transactionsList;

export const selectTargetedTransaction = (state: RootState) =>
  state.transactions.targetedTransaction;

export const selectStatistics = (state: RootState) =>
  state.transactions.statistics;
