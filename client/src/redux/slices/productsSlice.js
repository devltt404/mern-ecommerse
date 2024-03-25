import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsLoading: false,
  productsError: null,
  products: [],
  totalProducts: 0,
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsLoading: (state) => {
      state.productsLoading = true;
    },
    setProducts: (state, action) => {
      state.productsLoading = false;
      state.productsError = null;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.totalProducts = action.payload.totalProducts;
    },
    setProductsError: (state, action) => {
      state.productsLoading = false;
      state.productsError = action.payload;
    },
    setProductImage: (state, action) => {
      state.productsLoading = false;
      state.productsError = null;
      state.products[action.payload.index].images[0] = action.payload.image;
    },
  },
});

export const {
  setProducts,
  setProductsLoading,
  setProductsError,
  setProductImage,
} = productsSlice.actions;
export const productsSelector = (state) => state.products;
export default productsSlice.reducer;
