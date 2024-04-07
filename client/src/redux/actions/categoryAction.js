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

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.post("/", { category });
    dispatch(setCategories(data));

    toast.success("Category added successfully");
  } catch (error) {
    handleActionError(dispatch, error, setCategoriesError, true);
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.delete("/" + categoryId);
    dispatch(setCategories(data));

    toast.success("Category deleted successfully");
  } catch (error) {
    handleActionError(dispatch, error, setCategoriesError, true);
  }
};
