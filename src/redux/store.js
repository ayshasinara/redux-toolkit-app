import { configureStore } from "@reduxjs/toolkit";
import loremSlice from "./loremSlice";

const store = configureStore({
  reducer: {
    lorem: loremSlice.reducer,
  },
});

export default store;
