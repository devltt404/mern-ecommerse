import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TableWithPagination } from "../../../../components/index.js";
import { getOrders } from "../../../../redux/actions/orderAction.js";
import { orderSelector } from "../../../../redux/slices/orderSlice.js";
import OrdersTable from "./components/OrdersTable.jsx";

const OrdersPage = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalOrders, pagination } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getOrders({ page, limit: 5 }));
  }, [searchParams]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">
        Orders <span className="font-normal">({totalOrders})</span>
      </h1>

      <TableWithPagination
        Table={OrdersTable}
        page={pagination.page}
        totalPages={pagination.totalPages}
        handlePageSelected={(page) => {
          navigate("/admin/orders?page=" + page);
        }}
      />
    </div>
  );
};

export default OrdersPage;
