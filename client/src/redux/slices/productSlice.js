import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productLoading: false,
  productError: null,
  product: null,
  products: [],
  bestSelling: [],
  topRated: [],
  latestProducts: [],
  totalProducts: 0,
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductLoading: (state) => {
      state.productLoading = true;
    },
    setProduct: (state, action) => {
      state.productLoading = false;
      state.productError = null;
      state.product = action.payload;
    },
    setProducts: (state, action) => {
      state.productLoading = false;
      state.productError = null;
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
      state.totalProducts = action.payload.totalProducts;
    },
    setIndexProducts: (state, action) => {
      state.productLoading = false;
      state.productError = null;
      state.bestSelling = action.payload.bestSelling;
      state.topRated = action.payload.topRated;
      state.latestProducts = action.payload.latestProducts;
    },
    setProductImage: (state, action) => {
      state.productLoading = false;
      state.productError = null;
      state.products[action.payload.index].images[0] = action.payload.image;
    },
    addProductReview: (state, action) => {
      state.productLoading = false;
      state.productError = null;
      state.product.reviews.push(action.payload);
    },
    setProductError: (state, action) => {
      state.productLoading = false;
      state.productError = action.payload;
    },
  },
});

export const {
  setProduct,
  setProductLoading,
  setProductError,
  addProductReview,
  setProductImage,
  setProducts,
  setIndexProducts,
} = productSlice.actions;
export const productSelector = (state) => state.product;
export default productSlice.reducer;
