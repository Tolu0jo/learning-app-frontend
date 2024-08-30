import { IRegister, loginApi, logoutApi, registerApi } from "./authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: IRegister, thunkAPI) => {
    try {
      const response = await loginApi(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: IRegister, thunkAPI) => {
    try {
      const response = await registerApi(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
function rejectWithValue(arg0: any): any {
  throw new Error("Function not implemented.");
}
