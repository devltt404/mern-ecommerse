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
    setSubtotal: (state, action) => {
      state.subtotal = action.payload;
    },
    setShipping: (state, action) => {
      state.shipping = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
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
  setShipping,
  setSubtotal,
  setTotal,
} = cartSlice.actions;
export const cartSelector = (state) => state.cart;
export default cartSlice.reducer;
