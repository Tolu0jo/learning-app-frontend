import { createSlice, PayloadAction,SerializedError } from "@reduxjs/toolkit";
import { login, register } from "./authThunk";

export interface User {
  id: string;
  name: string;
  email: string;
  role:string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  loading: boolean;
  success: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  access_token: null,
  loading: false,
  success: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthSuccess: (state) => {
      state.success = null;
    },
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Registered successfully!";
      })
      .addCase(register.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ user: User; access_token: string }>) => {
          state.user = action.payload.user;
          state.access_token = action.payload.access_token;
          state.loading = false;
          state.success = "Login successful!";
        }
      )
      .addCase(login.rejected, (state, action:any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetAuthError, resetAuthSuccess } = authSlice.actions;
export default authSlice.reducer;
