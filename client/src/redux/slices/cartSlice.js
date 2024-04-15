import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartLoading: false,
  cartError: null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  subtotal: 0,
  shipping: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading: (state) => {
      state.cartLoading = true;
    },
    setCart: (state, action) => {
      state.cartLoading = false;
      state.cartError = null;
      state.cart = action.payload;
    },
    setPropagatedCart: (state, action) => {
      state.cartLoading = false;
      state.cartError = null;
      state.cart = action.payload.cart;
      state.subtotal = action.payload.subtotal;
      state.shipping = action.payload.shipping;
      state.total = action.payload.total;
    },
    setCartError: (state, action) => {
      state.cartLoading = false;
      state.cartError = action.payload;
    },
  },
});

export const {
  setCart,
  setDetailedCart,
  setCartLoading,
  setCartError,
  setPropagatedCart,
  setShipping,
  setSubtotal,
  setTotal,
} = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
