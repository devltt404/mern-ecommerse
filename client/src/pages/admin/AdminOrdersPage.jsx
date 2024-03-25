import React from "react";
import { useSelector } from "react-redux";
import { ordersSelector } from "../../redux/slices/ordersSlice.js";
import AdminOrdersTable from "./AdminOrdersTable.jsx";

const AdminOrdersPage = () => {
  const { totalOrders } = useSelector(ordersSelector);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">
        Orders <span className="font-normal">({totalOrders})</span>
      </h1>
      <AdminOrdersTable />
    </div>
  );
};

export default AdminOrdersPage;
