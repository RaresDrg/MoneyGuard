import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TransactionsState, Transaction } from "../../App.types";
import { utils } from "../../utils/handleState";
import { PAGE_SIZE } from "../../constants";
import {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from "./operations";

const initialState: TransactionsState = {
  isLoading: false,
  error: null,
  transactionsList: [],
  initialFetchDone: false,
  cursor: null,
  hasMore: true,
  targetedTransaction: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    resetTransactions() {
      return initialState;
    },
    setTargetedTransaction(state, action: PayloadAction<Transaction>) {
      state.targetedTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Add Transaction
      .addCase(addTransaction.pending, utils.handlePending)
      .addCase(addTransaction.rejected, utils.handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.transactionsList.unshift(action.payload.data.addedTransaction);
      })
      // *Get Transactions
      .addCase(getTransactions.fulfilled, (state, action) => {
        const newTransactions = action.payload.data.transactions;
        const { length } = newTransactions;
        if (length > 0) state.transactionsList.push(...newTransactions);
        if (length === PAGE_SIZE) state.cursor = newTransactions.at(-1).id;
        if (length < PAGE_SIZE) state.hasMore = false;
        if (!("cursor" in action.meta.arg)) state.initialFetchDone = true;
      })
      // *Update Transaction
      .addCase(updateTransaction.pending, utils.handlePending)
      .addCase(updateTransaction.rejected, utils.handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        const updatedTransaction = action.payload.data.updatedTransaction;
        const index = state.transactionsList.findIndex(
          (item) => item.id === updatedTransaction.id
        );
        state.transactionsList[index] = updatedTransaction;
      })
      // *Delete Transaction
      .addCase(deleteTransaction.pending, utils.handlePending)
      .addCase(deleteTransaction.rejected, utils.handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        const deletedTransactionID = action.payload.data.deletedTransaction.id;
        const index = state.transactionsList.findIndex(
          (item) => item.id === deletedTransactionID
        );
        state.transactionsList.splice(index, 1);
      });
  },
});

export const { resetTransactions, setTargetedTransaction } =
  transactionsSlice.actions;

export const transactionsReducer = transactionsSlice.reducer;
