import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authSlice } from "./authSlice";
import { recommendSlice } from "./recommendSlice";
import { savedReviewSlice } from "./savedReviewSlice";
import { searchResultSlice } from "./searchResultSlice";

const persistConfig = {
  key: "bookbook",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  searchResult: searchResultSlice.reducer,
  recommend: recommendSlice.reducer,
  auth: authSlice.reducer,
  savedReview: savedReviewSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
