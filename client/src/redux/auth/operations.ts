import { createAsyncThunk } from "@reduxjs/toolkit";
import { delay, apiClient } from "../../utils";

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

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await delay(1500);
    const response = await apiClient.delete("/api/users/logout");

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data: { validationToken: string; password: string }, thunkAPI) => {
    const { validationToken, password } = data;

    try {
      await delay(2500);
      const response = await apiClient.patch(
        `/api/users/update-password?validationToken=${validationToken}`,
        { password }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
