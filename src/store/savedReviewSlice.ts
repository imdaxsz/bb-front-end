import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Count {
  count: number;
}

const initialState: Count = {
  count: 0
};

export const savedReviewSlice = createSlice({
  name: "savedReview",
  initialState,
  reducers: {
    reset: () => initialState,
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { reset, setCount } = savedReviewSlice.actions;
export default savedReviewSlice.reducer;
