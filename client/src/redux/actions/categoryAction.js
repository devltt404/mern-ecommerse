import { toast } from "react-hot-toast";
import { categoryAxios } from "../../helpers/axiosInstances.js";
import { handleActionError } from "../../helpers/handleActionError.js";
import {
  setCategories,
  setCategoriesError,
  setCategoriesLoading,
} from "../slices/categorySlice.js";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.get("/");
    dispatch(setCategories(data));
  } catch (error) {
    handleActionError(dispatch, error, setCategoriesError);
  }
};

export const addCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.post("/", { category });

    dispatch(setCategories(getState().category.categories.concat(data)));

    toast.success("Category added successfully");
  } catch (error) {
    handleActionError(dispatch, error, setCategoriesError, true);
  }
};

export const deleteCategory = (category) => async (dispatch) => {
  if (category.numProducts > 0) {
    toast.error("Cannot delete category that has products");
  } else {
    try {
      dispatch(setCategoriesLoading());
      const { data } = await categoryAxios.delete("/" + category._id);
      dispatch(setCategories(data));

      toast.success("Category deleted successfully");
    } catch (error) {
      handleActionError(dispatch, error, setCategoriesError, true);
    }
  }
};

export const getDetailedCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.get("/detail");
    dispatch(setCategories(data));
  } catch (error) {
    handleActionError(dispatch, error, setCategoriesError, true);
  }
};
