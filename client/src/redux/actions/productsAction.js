import toast from "react-hot-toast";
import { productAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import {
  setProductImage,
  setProducts,
  setProductsError,
  setProductsLoading,
} from "../slices/productsSlice.js";

export const getProducts =
  ({ ...filterOptions }) =>
  async (dispatch) => {
    try {
      dispatch(setProductsLoading());
      const { data } = await productAxios.get("/", {
        params: filterOptions,
      });
      dispatch(setProducts(data));
    } catch (error) {
      handleActionError(dispatch, error, setProductsError, true);
    }
  };

export const updateProductImage =
  ({ index, image }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setProductsLoading());
      const { products } = getState().products;
      const { data } = await productAxios.put(`/image/${products[index]._id}`, {
        image,
      });
      dispatch(setProductImage({ index, image }));
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductsError, true);
    }
  };

export const addProduct =
  ({ ...productData }) =>
  async (dispatch) => {
    try {
      dispatch(setProductsLoading());
      const { data } = await productAxios.post("/", productData);
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductsError, true);
    }
  };

export const editProduct =
  ({ ...productData }) =>
  async (dispatch) => {
    try {
      dispatch(setProductsLoading());
      const { data } = await productAxios.put("/", productData);
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductsError, true);
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch(setProductsLoading());
    const { data } = await productAxios.delete(`/${productId}`);
    await dispatch(getProducts({ page: 1, limit: 5 }));
    toast.success(data.message);
  } catch (error) {
    handleActionError(dispatch, error, setProductsError, true);
  }
};
