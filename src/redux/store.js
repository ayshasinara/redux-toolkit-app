import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import loremSlice from "./loremSlice";

const store = configureStore({
  reducer: {
    lorem: loremSlice.reducer,
    cart: cartSlice,
  },
});

export default store;
