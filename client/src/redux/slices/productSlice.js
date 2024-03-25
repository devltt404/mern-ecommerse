import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productLoading: false,
  productError: null,
  product: null,
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

export const { setProduct, setProductLoading, setProductError, addProductReview } =
  productSlice.actions;
export const productSelector = (state) => state.product;
export default productSlice.reducer;
