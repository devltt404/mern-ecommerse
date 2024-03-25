import toast from "react-hot-toast";
import { orderAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import { setCart } from "../slices/cartSlice.js";
import {
  setOrder,
  setOrders,
  setOrdersError,
  setOrdersLoading,
} from "../slices/ordersSlice.js";

export const createOrder =
  ({ ...orderData }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setOrdersLoading());

      const { data } = await orderAxios.post("/", {
        ...orderData,
        cart: getState().user.user ? [] : getState().cart.cart,
      });

      dispatch(setCart([]));
      if (!getState().user.user) localStorage.removeItem("cart");

      toast.success("Order created successfully");

      return data._id;
    } catch (error) {
      handleActionError(dispatch, error, setOrdersError, true);
    }
  };

export const getOrders =
  ({ ...options }) =>
  async (dispatch) => {
    try {
      dispatch(setOrdersLoading());

      const { data } = await orderAxios.get("/", { params: options });
      dispatch(setOrders(data));
    } catch (error) {
      handleActionError(dispatch, error, setOrdersError, true);
    }
  };

export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch(setOrdersLoading());

    const { data } = await orderAxios.get("/user");

    dispatch(setOrders({ orders: data }));
  } catch (error) {
    handleActionError(dispatch, error, setOrdersError, true);
  }
};

export const getOrder = (orderId) => async (dispatch) => {
  try {
    dispatch(setOrdersLoading());

    const { data } = await orderAxios.get("/" + orderId);
    dispatch(setOrder(data));
  } catch (error) {
    handleActionError(dispatch, error, setOrdersError, true);
  }
};
