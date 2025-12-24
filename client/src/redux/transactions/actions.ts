import { actions } from "./slice";

export const {
  resetSlice,
  setTransactionsList,
  addTransaction,
  editTransaction,
  deleteTransaction,
  setInitialFetchDone,
  setCursor,
  setNoMoreTransactions,
  setTargetedTransaction,
} = actions;
