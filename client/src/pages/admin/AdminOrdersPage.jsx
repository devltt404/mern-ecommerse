import React from "react";
import { useSelector } from "react-redux";
import { orderSelector } from "../../redux/slices/orderSlice.js";
import AdminOrdersTable from "./AdminOrdersTable.jsx";

const AdminOrdersPage = () => {
  const { totalOrders } = useSelector(orderSelector);

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
