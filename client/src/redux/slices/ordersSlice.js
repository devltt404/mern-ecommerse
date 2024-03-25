import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersLoading: true,
  ordersError: null,
  order: null,
  orders: [],
  totalOrders: 0,
  pagination: {
    page: 0,
    totalPages: 0,
  },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersLoading: (state) => {
      state.ordersLoading = true;
    },
    setOrders: (state, action) => {
      state.ordersLoading = false;
      state.ordersError = null;
      state.orders = action.payload.orders;
      if (action.payload.pagination && action.payload.totalOrders >= 1) {
        state.totalOrders = action.payload.totalOrders;
        state.pagination = action.payload.pagination;
      }
    },
    setOrder: (state, action) => {
      state.ordersLoading = false;
      state.ordersError = null;
      state.order = action.payload;
    },
    setOrdersError: (state, action) => {
      state.ordersLoading = false;
      state.ordersError = action.payload;
    },
  },
});

export const {
  setOrders,
  setOrdersLoading,
  setOrdersError,
  setOrder,
  setOrderCreated,
} = ordersSlice.actions;
export const ordersSelector = (state) => state.orders;
export default ordersSlice.reducer;
