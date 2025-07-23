import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TransactionsState, Transaction } from "../../App.types";
import { utils } from "../../utils/handleState";
import {
  addTransaction,
  getList,
  deleteTransaction,
  updateTransaction,
  getStatistics,
} from "./operations";

const initialState: TransactionsState = {
  isLoading: false,
  error: null,
  balance: 0,
  transactionsList: null,
  targetedTransaction: null,
  statistics: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    setTargetedTransaction(state, action: PayloadAction<Transaction>) {
      state.targetedTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // *Add Transaction
      .addCase(addTransaction.pending, utils.handlePending)
      .addCase(addTransaction.rejected, utils.handleRejected)
      .addCase(addTransaction.fulfilled, utils.handleTransactions)

      // *Delete Transaction
      .addCase(deleteTransaction.pending, utils.handlePending)
      .addCase(deleteTransaction.rejected, utils.handleRejected)
      .addCase(deleteTransaction.fulfilled, utils.handleTransactions)

      // *Update Transaction
      .addCase(updateTransaction.pending, utils.handlePending)
      .addCase(updateTransaction.rejected, utils.handleRejected)
      .addCase(updateTransaction.fulfilled, utils.handleTransactions)

      // *Get Transactions List
      .addCase(getList.rejected, (state, action) => {
        utils.handleRejected(state, action);
        state.transactionsList = null;
        state.balance = 0;
      })
      .addCase(getList.fulfilled, utils.handleTransactions)

      // *Get Statistics
      .addCase(getStatistics.pending, utils.handlePending)
      .addCase(getStatistics.rejected, (state, action) => {
        utils.handleRejected(state, action);
        state.statistics = null;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        utils.handleFulfilled(state);
        state.statistics = action.payload.data.statistics;
      });
  },
});

export const { setTargetedTransaction } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;
