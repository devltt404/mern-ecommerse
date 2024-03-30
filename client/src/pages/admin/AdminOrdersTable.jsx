import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading.jsx";
import Table from "../../components/table/Table.jsx";
import TableBody from "../../components/table/TableBody.jsx";
import TableBodyItem from "../../components/table/TableBodyItem.jsx";
import TableBodyRow from "../../components/table/TableBodyRow.jsx";
import TableHead from "../../components/table/TableHead.jsx";
import TableHeadItem from "../../components/table/TableHeadItem.jsx";
import { getOrders } from "../../redux/actions/orderAction.js";
import { orderSelector } from "../../redux/slices/orderSlice.js";

const AdminOrdersTable = () => {
  const dispatch = useDispatch();
  const { orders, orderLoading } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getOrders({ page: 1, limit: 5 }));
  }, []);

  return orderLoading ? (
    <Loading />
  ) : (
    <Table>
      <TableHead>
        <TableHeadItem className="text-left">ID</TableHeadItem>
        <TableHeadItem className="text-center">DATE</TableHeadItem>
        <TableHeadItem className="text-center">SHIP TO</TableHeadItem>
        <TableHeadItem className="text-right">TOTAL</TableHeadItem>
      </TableHead>

      <TableBody>
        {orders.map((order) => (
          <TableBodyRow key={order._id}>
            <TableBodyItem className="text-left">{order._id}</TableBodyItem>
            <TableBodyItem className="text-center">
              {moment(order.createdAt).format("MM/DD/YYYY")}
            </TableBodyItem>
            <TableBodyItem className="text-center">
              {order.shippingAddress.address}
            </TableBodyItem>
            <TableBodyItem className="text-right">${order.total}</TableBodyItem>
          </TableBodyRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminOrdersTable;
