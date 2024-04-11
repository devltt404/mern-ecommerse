import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../../../components/index.js";
import { getUserOrders } from "../../../redux/actions/orderAction.js";
import { orderSelector } from "../../../redux/slices/orderSlice.js";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, orderLoading } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return (
    <div className="container py-6">
      <h1 className="mb-4 text-3xl font-semibold">
        My Orders <span className="font-medium">({orders.length})</span>
      </h1>
      {orderLoading ? (
        <SpinnerLoading />
      ) : orders.length === 0 ? (
        <p className="text-lg">You don't have any orders yet.</p>
      ) : (
        orders.map((order) => {
          return (
            <Link key={order._id} to={`/orders/${order._id}`}>
              <div className="mb-4 border border-gray-300 p-4 transition hover:scale-[1.02]">
                <div className="grid grid-cols-[68%_30%] justify-between">
                  <div>
                    <h2 className="mb-1 truncate text-lg font-medium">
                      Order ID: #{order._id}
                    </h2>
                    <p>
                      <span className="text-gray-400">Ordered on: </span>{" "}
                      {moment(order.createdAt).format("MMMM DD, YYYY")}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="mb-1">{order.orderProducts?.length} Items</p>
                    <p className="text-xl font-semibold">${order.total}</p>
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-5 [&>li]:w-16 ">
                  {order.orderProducts?.map((product) => (
                    <li key={product._id} className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-contain"
                      />
                      <span className="absolute -right-2 -top-2 flex aspect-square h-4 items-center justify-center rounded-full bg-black text-xs font-medium text-white">
                        {product.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;
