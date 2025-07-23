import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, delay } from "../../utils";
import type { Transaction } from "../../App.types";

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (data: Omit<Transaction, "_id">, thunkAPI) => {
    try {
      const response = await apiClient.post("/api/transactions", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getList = createAsyncThunk(
  "transactions/getList",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/api/transactions");

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

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async (data: { ID: string; updates: Omit<Transaction, "_id"> }, thunkAPI) => {
    try {
      const { ID, updates } = data;
      const response = await apiClient.put(`/api/transactions/${ID}`, updates);

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
