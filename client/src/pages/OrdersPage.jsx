import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { getUserOrders } from "../redux/actions/orderAction.js";
import { orderSelector } from "../redux/slices/orderSlice.js";

const OrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, orderLoading } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return orderLoading ? (
    <Loading />
  ) : (
    <div className="container py-6">
      <h1 className="mb-4 text-3xl font-semibold">My Orders</h1>
      {orders.map((order) => (
        <Link to={`/orders/${order._id}`}>
          <div className="p-4 mb-4 transition border border-gray-300 hover:scale-[1.02]">
            <div className="grid grid-cols-[68%_30%] justify-between">
              <div>
                <h2 className="mb-1 text-lg font-medium truncate">
                  Order ID: #{order._id}
                </h2>
                <p>
                  <span className="text-gray-400">Ordered on: </span>{" "}
                  {moment(order.createdAt).format("MMMM DD, YYYY")}
                </p>
              </div>

              <div className="text-right">
                <p className="mb-1">{order.orderProducts.length} Items</p>
                <p className="text-xl font-semibold">${order.total}</p>
              </div>
            </div>

            <ul className="flex mt-4 gap-5 [&>li]:w-16 flex-wrap ">
              {order.orderProducts.map((product) => (
                <li key={product._id} className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-16 h-16"
                  />
                  <span className="absolute flex items-center justify-center h-4 text-xs font-medium text-white bg-black rounded-full -top-2 -right-2 aspect-square">
                    {product.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersPage;
