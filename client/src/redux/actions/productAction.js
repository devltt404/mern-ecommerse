import toast from "react-hot-toast";
import { productAxios, reviewAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import {
  addProductReview,
  setProduct,
  setProductError,
  setProductLoading,
} from "../slices/productSlice.js";

export const getProductById = (navigate, id) => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const { data } = await productAxios.get(`/${id}`);
    dispatch(setProduct(data));
  } catch (error) {
    if (error.response.status === 404) navigate("/not-found");
    handleActionError(dispatch, error, setProductError, true);
  }
};

export const addReview =
  ({ title, rating, content }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setProductLoading());
      const { data } = await reviewAxios.post("/", {
        title,
        rating,
        content,
        productId: getState().product.product._id,
      });
      dispatch(addProductReview(data));
      toast.success("Review added successfully!");
    } catch (error) {
      handleActionError(dispatch, error, setProductError, true);
    }
  };
