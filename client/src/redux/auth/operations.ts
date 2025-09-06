import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay, apiClient, resetStore } from "../../utils";

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      await delay(2500);
      const response = await apiClient.post("/api/users/register", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; loginPassword: string }, thunkAPI) => {
    try {
      await delay(2500);
      const response = await apiClient.post("/api/users/login", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await delay(1500);
    await apiClient.delete("/api/users/logout");
  } finally {
    resetStore();
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: { validationToken: string; password: string }, thunkAPI) => {
    try {
      await delay(2500);
      const response = await apiClient.patch(
        "/api/users/update-password",
        data
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
