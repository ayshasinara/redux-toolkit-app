import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    getDataToCart: (state, action) => {
      return { ...state, cart: [...state.cart, action.payload] };
    },
    deleteIteamFromCart: (state, action) => {
      let data = state.cart.filter((item) => item.id !== action.payload);

      return {
        ...state,
        cart: data,
      };
    },
    incrementCount: (state, action) => {
      let data = state.cart.filter((item) => item.id === action.payload.id);

      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...data,
            count: action.payload.count + 1,
          },
        ],
      };
    },
    updateDataToCart: (state, action) => {
      let find = state.cart.filter((e) =>
        e.id === action.payload
          ? { ...state.e, count: state?.e.count + 1 }
          : { ...state }
      );
      return find;
    },
  },
});

export const {
  getDataToCart,
  deleteIteamFromCart,
  incrementCount,
  updateDataToCart,
} = cartSlice.actions;
export default cartSlice.reducer;
