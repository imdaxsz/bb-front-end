import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DetailBookResponse } from "api/BookApi";

interface searchResult {
  keyword: string;
  books: DetailBookResponse[] | null;
  selected: DetailBookResponse | null;
  categoryId: string;
}

const initialState: searchResult = {
  keyword: "",
  books: null,
  selected: null,
  categoryId: "",
};

export const searchResultSlice = createSlice({
  name: "searchResult",
  initialState,
  reducers: {
    reset: () => initialState,

    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setResult(state, action: PayloadAction<DetailBookResponse[]>) {
      state.books = action.payload;
    },
    setSelected(state, action: PayloadAction<DetailBookResponse | null>) {
      state.selected = action.payload;
    },
    setCategoryId(state, action: PayloadAction<string>) {
      state.categoryId = action.payload;
    },
  },
});

export const { reset, setKeyword, setResult, setSelected, setCategoryId } =
  searchResultSlice.actions;
export default searchResultSlice.reducer;
