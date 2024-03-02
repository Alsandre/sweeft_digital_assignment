import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice";
import { unsplashApi } from "./unsplashApi";

const store = configureStore({
  reducer: {
    history: historyReducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(unsplashApi.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
