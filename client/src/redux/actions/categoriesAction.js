import { categoryAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import {
  setCategories,
  setCategoriesError,
  setCategoriesLoading,
} from "../slices/categoriesSlice.js";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(setCategoriesLoading());
    const { data } = await categoryAxios.get("/");
    dispatch(setCategories(data));
  } catch (error) {
    dispatch(handleActionError(dispatch, error, setCategoriesError));
  }
};
