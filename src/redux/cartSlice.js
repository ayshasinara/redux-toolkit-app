import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalprice: 0,
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
      let data = state.cart.filter((e) => e.id !== action.payload.id);
      data.push(action.payload);
      return { ...state, cart: data };
    },
    totalPrice: (state) => {
      let totalAmmount = state.cart.reduce((a, c) => c.count * c.price + a, 0);
      console.log(totalAmmount);
      return { ...state, totalprice: totalAmmount };
    },
  },
});

export const {
  getDataToCart,
  deleteIteamFromCart,
  incrementCount,
  updateDataToCart,
  totalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
