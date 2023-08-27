import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/types";

interface Recommend {
  book: Book | null;
  modal: boolean;
}

const initialState: Recommend = {
  book: null,
  modal: false,
};

export const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
    reset: () => initialState,
    setRecBook(state, action: PayloadAction<Book | null>) {
      state.book = action.payload;
    },
    setRecModal(state, action: PayloadAction<boolean>) {
      state.modal = action.payload;
    },
  },
});

export const { reset, setRecBook, setRecModal } = recommendSlice.actions;
export default recommendSlice.reducer;
