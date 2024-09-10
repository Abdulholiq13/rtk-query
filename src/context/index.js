import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { userApi } from "./api/userApi";

export const store = configureStore({
  reducer: {
    users: userApi,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
