import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import loremSlice from "./loremSlice";

const store = configureStore({
  reducer: {
    lorem: loremSlice.reducer,
    cart: cartReducer,
  },
});

export default store;
