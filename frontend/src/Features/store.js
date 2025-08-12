import { configureStore } from "@reduxjs/toolkit";
import { exclusiveApi } from "./Api/exclusive.Api";
import cartReducer from "./AllSlice/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [exclusiveApi.reducerPath]: exclusiveApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exclusiveApi.middleware),
});
