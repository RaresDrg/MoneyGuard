import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, resetStore, requestWithDelay } from "../../utils";

export const register = createAsyncThunk(
  "auth/register",
  async (
    userData: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await requestWithDelay(
        apiClient.post("/api/users/register", userData),
        2500
      );

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
      const response = await requestWithDelay(
        apiClient.post("/api/users/login", userData),
        2500
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await requestWithDelay(apiClient.delete("/api/users/logout"), 1500);
  } catch {
    // ignore error
  } finally {
    resetStore();
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: { validationToken: string; password: string }, thunkAPI) => {
    try {
      const response = await requestWithDelay(
        apiClient.patch("/api/users/update-password", data),
        2500
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
