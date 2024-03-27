import toast from "react-hot-toast";
import { cartAxios, userAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import { setCart } from "../slices/cartSlice.js";
import {
  setUser,
  setUserAvatar,
  setUserError,
  setUserLoading,
  setUsers,
} from "../slices/userSlice.js";

export const authUser =
  ({ endpoint, ...userData }) =>
  async (dispatch) => {
    try {
      dispatch(setUserLoading());
      console.log(userData);
      const { data } = await userAxios.post(endpoint, userData);
      dispatch(setUser(data.user));

      if (data.cart.length === 0) {
        if (!localStorage.getItem("cart")) dispatch(setCart([]));
        else {
          const cart = JSON.parse(localStorage.getItem("cart"));
          localStorage.removeItem("cart");
          dispatch(setCart(cart));
          if (cart.length > 0) {
            await cartAxios.post("/", cart);
            toast.success("Your cart has been kept.");
          }
        }
      } else {
        dispatch(setCart(data.cart));
      }

      toast.success("Welcome " + data.user.name);
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
  };

export const getUser = () => async (dispatch) => {
  try {
    dispatch(setUserLoading());
    const { data } = await userAxios.get("/auth");
    dispatch(setUser(data.user));
    dispatch(setCart(data.cart));
    toast.success("Welcome back " + data.user.name);
  } catch (error) {
    handleActionError(dispatch, error, setUserError);
  }
};

export const getAdmin = () => async (dispatch) => {
  try {
    dispatch(setUserLoading());
    const { data } = await userAxios.get("/auth-admin");
    dispatch(setUser(data.user));
    toast.success("Welcome back " + data.user.name);
  } catch (error) {
    handleActionError(dispatch, error, setUserError);
  }
};

export const logoutUser =
  (showToast = true) =>
  async (dispatch) => {
    try {
      dispatch(setUserLoading());
      await userAxios.post("/logout");

      dispatch(setUser(null));
      dispatch(setCart([]));

      if (showToast) toast.success("User logged out.");
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
  };

export const getUsers =
  ({ ...options }) =>
  async (dispatch) => {
    try {
      dispatch(setUserLoading());
      const { data } = await userAxios.get("/", { params: options });
      dispatch(setUsers(data));
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(setUserLoading());
    const { data } = await userAxios.delete(`/${userId}`);
    await dispatch(getUsers({ page: 1, limit: 5 }));
    toast.success(data.message);
  } catch (error) {
    handleActionError(dispatch, error, setUserError, true);
  }
};

export const updateUserAvatar =
  ({ index, image }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setUserLoading());
      const { users } = getState().user;
      const { data } = await userAxios.put(`/avatar/${users[index]._id}`, {
        image,
      });
      dispatch(setUserAvatar({ index, image }));
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
  };
