import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SearchResultBook } from "@/types";

interface searchResult {
  keyword: string;
  books: SearchResultBook[] | null;
  selected: SearchResultBook | null;
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
    setResult(state, action: PayloadAction<SearchResultBook[]>) {
      state.books = action.payload;
    },
    setSelected(state, action: PayloadAction<SearchResultBook | null>) {
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
