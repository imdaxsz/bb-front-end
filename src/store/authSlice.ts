import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { signin, signout, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
