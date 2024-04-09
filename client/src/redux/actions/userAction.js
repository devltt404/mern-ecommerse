import { googleLogout } from "@react-oauth/google";
import toast from "react-hot-toast";
import { cartAxios, userAxios } from "../../helpers/axiosInstances.js";
import { handleActionError } from "../../helpers/handleActionError.js";
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
  } catch (error) {
    handleActionError(dispatch, error, setUserError);
  }
};

export const getAdmin = () => async (dispatch) => {
  try {
    dispatch(setUserLoading());
    const { data } = await userAxios.get("/auth-admin");
    dispatch(setUser(data.user));
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
      googleLogout();

      dispatch(setUser(null));
      dispatch(setCart([]));

      if (showToast) toast.success("user logged out.");
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

export const deleteUser = (userId) => async (dispatch, getState) => {
  if (getState().user.user._id === userId) {
    toast.error("Cannot delete yourself.");
  } else {
    try {
      dispatch(setUserLoading());
      const { data } = await userAxios.delete(`/${userId}`);
      await dispatch(getUsers({ page: 1, limit: 5 }));
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
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

export const setRole = (userId) => async (dispatch, getState) => {
  if (getState().user.user._id === userId) {
    toast.error("Cannot change your own role.");
  } else {
    try {
      dispatch(setUserLoading());
      const { data } = await userAxios.put("/role/" + userId);
      dispatch(
        setUsers({
          users: getState().user.users.map((user) => {
            if (user._id === userId)
              return {
                ...user,
                role: user.role === "admin" ? "user" : "admin",
              };
            return user;
          }),
          pagination: getState().user.pagination,
          totalUsers: getState().user.totalUsers,
        }),
      );
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setUserError, true);
    }
  }
};
