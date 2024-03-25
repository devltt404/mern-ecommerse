import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLoading: true,
  userError: null,
  user: null,
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
    setUserAvatar: (state, action) => {
      state.userLoading = false;
      state.userError = null;
      state.user.avatar = action.payload.image;
    },
    setUserError: (state, action) => {
      state.userLoading = false;
      state.userError = action.payload;
    },
  },
});

export const { setUser, setUserLoading, setUserError, setUserAvatar } =
  userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;
