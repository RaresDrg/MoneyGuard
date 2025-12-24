import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TransactionsState, Transaction } from "../../App.types";

const initialState: TransactionsState = {
  transactionsList: [],
  initialFetchDone: false,
  cursor: null,
  hasMore: true,
  targetedTransaction: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetSlice() {
      return initialState;
    },
    setTransactionsList(state, action: PayloadAction<Transaction[]>) {
      state.transactionsList.push(...action.payload);
    },
    addTransaction(state, action: PayloadAction<Transaction>) {
      state.transactionsList.unshift(action.payload);
    },
    editTransaction(state, action: PayloadAction<Transaction>) {
      const index = state.transactionsList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.transactionsList[index] = action.payload;
    },
    deleteTransaction(state, action: PayloadAction<Transaction["id"]>) {
      const index = state.transactionsList.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) state.transactionsList.splice(index, 1);
    },
    setInitialFetchDone(state) {
      state.initialFetchDone = true;
    },
    setCursor(state, action: PayloadAction<Transaction["id"]>) {
      state.cursor = action.payload;
    },
    setNoMoreTransactions(state) {
      state.hasMore = false;
    },
    setTargetedTransaction(state, action: PayloadAction<Transaction>) {
      state.targetedTransaction = action.payload;
    },
  },
});

export const { actions, reducer } = transactionsSlice;
