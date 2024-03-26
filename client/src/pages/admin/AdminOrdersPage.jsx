import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TableWithPagination from "../../components/TableWithPagination.jsx";
import { getOrders } from "../../redux/actions/orderAction.js";
import { orderSelector } from "../../redux/slices/orderSlice.js";
import AdminOrdersTable from "./AdminOrdersTable.jsx";

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { totalOrders, pagination } = useSelector(orderSelector);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">
        Orders <span className="font-normal">({totalOrders})</span>
      </h1>

      <TableWithPagination
        Table={AdminOrdersTable}
        page={pagination.page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          dispatch(getOrders({ page, limit: 5 }));
        }}
      />
    </div>
  );
};

export default AdminOrdersPage;
