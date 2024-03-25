import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesLoading: false,
  categoriesError: null,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesLoading: (state) => {
      state.categoriesLoading = true;
    },
    setCategories: (state, action) => {
      state.categoriesLoading = false;
      state.categoriesError = null;
      state.categories = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.categoriesLoading = false;
      state.categoriesError = action.paiesload;
    },
  },
});

export const { setCategories, setCategoriesLoading, setCategoriesError } =
  categoriesSlice.actions;
export const categoriesSelector = (state) => state.categories;
export default categoriesSlice.reducer;
