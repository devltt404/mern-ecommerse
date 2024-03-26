import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderLoading: true,
  orderError: null,
  order: null,
  orders: [],
  totalOrders: 0,
  pagination: {
    page: 0,
    totalPages: 0,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderLoading: (state) => {
      state.orderLoading = true;
    },
    setOrders: (state, action) => {
      state.orderLoading = false;
      state.orderError = null;
      state.orders = action.payload.orders;
      if (action.payload.pagination && action.payload.totalOrders >= 1) {
        state.totalOrders = action.payload.totalOrders;
        state.pagination = action.payload.pagination;
      }
    },
    setOrder: (state, action) => {
      state.orderLoading = false;
      state.orderError = null;
      state.order = action.payload;
    },
    setOrderError: (state, action) => {
      state.orderLoading = false;
      state.orderError = action.payload;
    },
  },
});

export const { setOrders, setOrderLoading, setOrderError, setOrder } =
  orderSlice.actions;
export const orderSelector = (state) => state.order;
export default orderSlice.reducer;
