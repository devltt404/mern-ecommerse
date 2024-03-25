import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import Table from "../components/table/Table.jsx";
import TableBody from "../components/table/TableBody.jsx";
import TableBodyItem from "../components/table/TableBodyItem.jsx";
import TableBodyRow from "../components/table/TableBodyRow.jsx";
import TableHead from "../components/table/TableHead.jsx";
import TableHeadItem from "../components/table/TableHeadItem.jsx";
import { getUserOrders } from "../redux/actions/ordersAction.js";
import { ordersSelector } from "../redux/slices/ordersSlice.js";

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, ordersLoading } = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return ordersLoading ? (
    <Loading />
  ) : (
    <div className="container py-4">
      <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
      <Table>
        <TableHead>
          <TableHeadItem className="text-left">ORDER DATE</TableHeadItem>
          <TableHeadItem className="text-center">ADDRESS</TableHeadItem>
          <TableHeadItem className="text-center">TOTAL</TableHeadItem>
          <TableHeadItem className="text-right">STATUS</TableHeadItem>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableBodyRow
              key={order._id}
              onClick={() => {
                navigate("/orders/" + order._id);
              }}
              canClick={true}
            >
              <TableBodyItem>
                {moment(order.createdAt).format("MM/DD/YYYY - hh:mm A")}
              </TableBodyItem>
              <TableBodyItem className="text-center">
                {order.shippingAddress.address}
              </TableBodyItem>
              <TableBodyItem className="text-center">
                ${order.total}
              </TableBodyItem>
              <TableBodyItem className="text-right">Ordered</TableBodyItem>
            </TableBodyRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersPage;
