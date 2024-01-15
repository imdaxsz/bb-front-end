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
    fetch: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    reset: () => initialState,
  },
});

export const { fetch, reset } = authSlice.actions;
export default authSlice.reducer;
