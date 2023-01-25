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
      console.log(action.payload);
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
  },
});

export const { getDataToCart, deleteIteamFromCart, incrementCount } =
  cartSlice.actions;
export default cartSlice.reducer;
