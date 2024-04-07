import toast from "react-hot-toast";
import { orderAxios } from "../../helpers/axiosInstances.js";
import { handleActionError } from "../../helpers/handleActionError.js";
import { setCart } from "../slices/cartSlice.js";
import {
  setOrder,
  setOrderError,
  setOrderLoading,
  setOrders,
} from "../slices/orderSlice.js";

export const createOrder =
  ({ ...orderData }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading());

      const { data } = await orderAxios.post("/", {
        ...orderData,
        cart: getState().user.user ? [] : getState().cart.cart,
      });

      dispatch(setCart([]));
      if (!getState().user.user) localStorage.removeItem("cart");

      toast.success("order created successfully");

      return data._id;
    } catch (error) {
      handleActionError(dispatch, error, setOrderError, true);
      throw new Error();
    }
  };

export const getOrders =
  ({ ...options }) =>
  async (dispatch) => {
    try {
      dispatch(setOrderLoading());

      const { data } = await orderAxios.get("/", { params: options });
      dispatch(setOrders(data));
    } catch (error) {
      handleActionError(dispatch, error, setOrderError, true);
    }
  };

export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch(setOrderLoading());

    const { data } = await orderAxios.get("/user");

    dispatch(setOrders({ orders: data }));
  } catch (error) {
    handleActionError(dispatch, error, setOrderError, true);
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(setOrderLoading());

    const { data } = await orderAxios.get("/" + orderId);
    dispatch(setOrder(data));
  } catch (error) {
    handleActionError(dispatch, error, setOrderError);
  }
};
