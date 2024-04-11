import moment from "moment";
import { useSelector } from "react-redux";
import {
  SpinnerLoading,
  Table,
  TableBody,
  TableBodyItem,
  TableBodyRow,
  TableHead,
  TableHeadItem,
} from "../../../../../components/index.js";
import { orderSelector } from "../../../../../redux/slices/orderSlice.js";

const OrdersTable = () => {
  const { orders, orderLoading } = useSelector(orderSelector);

  return orderLoading ? (
    <SpinnerLoading />
  ) : (
    <Table>
      <TableHead>
        <TableHeadItem className="text-left">DATE</TableHeadItem>
        <TableHeadItem className="text-left">ORDER BY</TableHeadItem>
        <TableHeadItem className="text-center">SHIP TO</TableHeadItem>
        <TableHeadItem className="text-right">TOTAL</TableHeadItem>
      </TableHead>

      <TableBody>
        {orders.map((order) => (
          <TableBodyRow key={order._id}>
            <TableBodyItem className="text-left">
              {moment(order.createdAt).format("MM/DD/YYYY - hh:mm A")}
            </TableBodyItem>
            <TableBodyItem className="text-left">
              {order.userId?.name || "Guest"}
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

export default OrdersTable;
