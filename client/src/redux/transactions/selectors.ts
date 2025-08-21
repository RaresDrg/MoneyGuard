import type { RootState } from "../../App.types";

export const selectIsLoading = (state: RootState) =>
  state.transactions.isLoading;

export const selectTransactionsList = (state: RootState) =>
  state.transactions.transactionsList;

export const selectInitialFetchDone = (state: RootState) =>
  state.transactions.initialFetchDone;

export const selectCursor = (state: RootState) => state.transactions.cursor;

export const selectHasMore = (state: RootState) => state.transactions.hasMore;

export const selectTargetedTransaction = (state: RootState) =>
  state.transactions.targetedTransaction;
