import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoading: true,
  userError: null,
  user: null,
  users: [],
  totalUsers: 0,
  pagination: {
    page: 1,
    totalPages: 1,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoading: (state) => {
      state.userLoading = true;
    },
    setUser: (state, action) => {
      state.userLoading = false;
      state.userError = null;
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.userLoading = false;
      state.userError = null;
      state.users = action.payload.users;
      state.pagination = action.payload.pagination;
      state.totalUsers = action.payload.totalUsers;
    },

    setUserAvatar: (state, action) => {
      state.userLoading = false;
      state.userError = null;
      state.user.avatar = action.payload.image;
    },
    setUserError: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
    resetUserError: (state) => {
      state.userError = null;
    },
  },
});

export const {
  setUser,
  setUserLoading,
  setUserError,
  setUserAvatar,
  setUsers,resetUserError
} = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
