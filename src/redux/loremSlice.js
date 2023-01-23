import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { async } from "q";

export const getLorem = createAsyncThunk(
  "lorem/getData",
  async (arg, { rejectWithValue }) => {
    try {
      return await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((res) => {
          //   console.log(res);
          return res;
        });
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const loremSlice = createSlice({
  name: "lorem",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [getLorem.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getLorem.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getLorem.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
      state.isSuccess = false;
    },
  },
});

export default loremSlice;
