import { configureStore } from "@reduxjs/toolkit";
import { exclusiveApi } from "./Api/exclusive.Api";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exclusiveApi.middleware),
});
