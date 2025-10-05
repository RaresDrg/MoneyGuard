import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, requestWithDelay } from "../../utils";
import { updateBalance } from "../auth/slice";
import type { Transaction, PaginationParams } from "../../App.types";

type TransactionData = Omit<Transaction, "id">;
type TransactionID = Transaction["id"];

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data: TransactionData, thunkAPI) => {
    try {
      const response = await apiClient.post("/transactions", data);
      thunkAPI.dispatch(updateBalance(response.data.data.updatedBalance));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (paginationParams: PaginationParams, thunkAPI) => {
    try {
      const response = await requestWithDelay(
        apiClient.get("/transactions", { params: paginationParams }),
        1000
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (data: { id: TransactionID; updates: TransactionData }, thunkAPI) => {
    const { id, updates } = data;

    try {
      const response = await apiClient.put(`/transactions/${id}`, updates);
      thunkAPI.dispatch(updateBalance(response.data.data.updatedBalance));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id: TransactionID, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/transactions/${id}`);
      thunkAPI.dispatch(updateBalance(response.data.data.updatedBalance));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
