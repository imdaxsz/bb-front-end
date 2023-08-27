import { configureStore } from "@reduxjs/toolkit";
import { searchResultSlice } from "./searchResultSlice";
import { recommendSlice } from "./recommendSlice";

export const store = configureStore({
  reducer: {
    searchResult: searchResultSlice.reducer,
    recommend: recommendSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
