import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    signout: (state) => {
      state.token = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
