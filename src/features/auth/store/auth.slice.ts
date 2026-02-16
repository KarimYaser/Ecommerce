import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type user = {
  name: string;
  email?: string;
  role: string;
  _id?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  userInfo: user | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    clearAuthInfo: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const { setAuthInfo, clearAuthInfo } = authSlice.actions;
export const authReducer = authSlice.reducer;
