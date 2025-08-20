import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, delay } from "../../utils";
import { updateBalance } from "../auth/slice";
import type { Transaction, PaginationParams } from "../../App.types";

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data: Omit<Transaction, "_id">, thunkAPI) => {
    try {
      const response = await apiClient.post("/api/transactions", data);
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
      // todo: verificat in productie
      await delay(1000);
      const response = await apiClient.get("/api/transactions", {
        params: paginationParams,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (data: { ID: string; updates: Omit<Transaction, "_id"> }, thunkAPI) => {
    const { ID, updates } = data;

    try {
      const response = await apiClient.put(`/api/transactions/${ID}`, updates);
      thunkAPI.dispatch(updateBalance(response.data.data.updatedBalance));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (ID: string, thunkAPI) => {
    try {
      const response = await apiClient.delete(`/api/transactions/${ID}`);
      thunkAPI.dispatch(updateBalance(response.data.data.updatedBalance));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getStatistics = createAsyncThunk(
  "transactions/getStatistics",
  async (data: { month: number; year: number }, thunkAPI) => {
    const { month, year } = data;

    try {
      await delay(500);
      const response = await apiClient.get(
        `/api/transactions/statistics?month=${month}&year=${year}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
