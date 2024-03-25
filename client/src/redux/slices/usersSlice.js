import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersLoading: true,
  usersError: null,
  users: [],
  pagination: {
    page: 1,
    totalPages: 1,
  },
  totalUsers: 0,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsersLoading: (state) => {
      state.usersLoading = true;
    },
    setUsers: (state, action) => {
      state.usersLoading = false;
      state.usersError = null;
      state.users = action.payload.users;
      state.pagination = action.payload.pagination;
      state.totalUsers = action.payload.totalUsers;
    },
    setUsersError: (state, action) => {
      state.usersLoading = false;
      state.usersError = action.payload;
    },
  },
});

export const {
  setUsersLoading,
  setUsersError,
  setUsers,
  setUserAvatar,
} = usersSlice.actions;

export const usersSelector = (state) => state.users;
export default usersSlice.reducer;
