import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryLoading: false,
  categoryError: null,
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoriesLoading: (state) => {
      state.categoryLoading = true;
    },
    setCategories: (state, action) => {
      state.categoryLoading = false;
      state.categoryError = null;
      state.categories = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.categoryLoading = false;
      state.categoryError = action.paiesload;
    },
  },
});

export const { setCategories, setCategoriesLoading, setCategoriesError } =
  categorySlice.actions;
export const categorySelector = (state) => state.category;
export default categorySlice.reducer;
