import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../types/types";

interface searchResult {
  books: Book[],
  selected: Book | null,
}

const initialState: searchResult = {
  books: [],
  selected: null
};

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    reset: () => initialState,
    setResult(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setSelected(state, action: PayloadAction<Book | null>) {
      state.selected = action.payload;
    }
  },
});

export const { reset, setResult, setSelected } = searchResultSlice.actions;
export default searchResultSlice.reducer;