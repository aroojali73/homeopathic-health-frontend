// src/redux/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IUserState = {
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
  role: string;
};

interface AuthState {
  user: IUserState | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState | null>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export default authSlice.reducer;
