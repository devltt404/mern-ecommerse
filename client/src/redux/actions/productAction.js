import toast from "react-hot-toast";
import { productAxios, reviewAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import {
  addProductReview,
  setIndexProducts,
  setProduct,
  setProductError,
  setProductImage,
  setProductLoading,
  setProducts,
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

export const getProducts =
  ({ ...filterOptions }) =>
  async (dispatch) => {
    try {
      dispatch(setProductLoading());
      const { data } = await productAxios.get("/", {
        params: filterOptions,
      });
      dispatch(setProducts(data));
    } catch (error) {
      handleActionError(dispatch, error, setProductError, true);
    }
  };

export const updateProductImage =
  ({ index, image }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setProductLoading());
      const { products } = getState().product;
      const { data } = await productAxios.put(`/image/${products[index]._id}`, {
        image,
      });
      dispatch(setProductImage({ index, image }));
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductError, true);
    }
  };

export const addProduct =
  ({ ...productData }) =>
  async (dispatch) => {
    try {
      dispatch(setProductLoading());
      const { data } = await productAxios.post("/", productData);
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductError, true);
    }
  };

export const editProduct =
  ({ ...productData }) =>
  async (dispatch) => {
    try {
      dispatch(setProductLoading());
      const { data } = await productAxios.put("/", productData);
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setProductError, true);
    }
  };

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const { data } = await productAxios.delete(`/${productId}`);
    await dispatch(getProducts({ page: 1, limit: 5 }));
    toast.success(data.message);
  } catch (error) {
    handleActionError(dispatch, error, setProductError, true);
  }
};

export const getIndexProducts = () => async (dispatch) => {
  try {
    dispatch(setProductLoading());
    const { data } = await productAxios.get("/index");
    dispatch(setIndexProducts(data));
  } catch (error) {
    handleActionError(dispatch, error, setProductError, true);
  }
};
