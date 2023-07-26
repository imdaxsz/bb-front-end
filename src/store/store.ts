import { configureStore } from "@reduxjs/toolkit";
import { searchResultSlice } from "./searchResultSlice";

export const store = configureStore({
  reducer: {
    searchResult: searchResultSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
