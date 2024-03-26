import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";
import categorySlice from "./slices/categorySlice.js";
import orderSlice from "./slices/orderSlice.js";
import productSlice from "./slices/productSlice.js";
import userSlice from "./slices/userSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    category: categorySlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export default store;
