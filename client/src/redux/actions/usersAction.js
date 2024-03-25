import toast from "react-hot-toast";
import { userAxios } from "../../utils/axiosInstances.js";
import { handleActionError } from "../../utils/handleActionError.js";
import {
  setUsers,
  setUsersError,
  setUsersLoading,
} from "../slices/usersSlice.js";

export const getUsers =
  ({ ...options }) =>
  async (dispatch) => {
    try {
      dispatch(setUsersLoading());
      const { data } = await userAxios.get("/", { params: options });
      dispatch(setUsers(data));
    } catch (error) {
      handleActionError(dispatch, error, setUsersError, true);
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(setUsersLoading());
    const { data } = await userAxios.delete(`/${userId}`);
    await dispatch(getUsers({ page: 1, limit: 5 }));
    toast.success(data.message);
  } catch (error) {
    handleActionError(dispatch, error, setUsersError, true);
  }
};

export const updateUserAvatar =
  ({ index, image }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setUsersLoading());
      const { users } = getState().user;
      const { data } = await userAxios.put(`/avatar/${users[index]._id}`, {
        image,
      });
      dispatch(setUserAvatar({ index, image }));
      toast.success(data.message);
    } catch (error) {
      handleActionError(dispatch, error, setUsersError, true);
    }
  };