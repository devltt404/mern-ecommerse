import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.js";
import categoriesSlice from "./slices/categoriesSlice.js";
import ordersSlice from "./slices/ordersSlice.js";
import productSlice from "./slices/productSlice.js";
import productsSlice from "./slices/productsSlice.js";
import userSlice from "./slices/userSlice.js";
import usersSlice from "./slices/usersSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    product: productSlice,
    products: productsSlice,
    categories: categoriesSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
});

export default store;
