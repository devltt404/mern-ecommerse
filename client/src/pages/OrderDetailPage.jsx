import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckoutItem from "../components/CheckoutItem.jsx";
import Loading from "../components/Loading.jsx";
import { getOrder } from "../redux/actions/ordersAction.js";
import { ordersSelector } from "../redux/slices/ordersSlice.js";

const OrderDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, ordersLoading } = useSelector(ordersSelector);

  useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  return ordersLoading ? (
    <Loading />
  ) : (
    <div className="container py-4">
      <h1 className="font-semibold text-3xl mb-2">Order Detail</h1>

      <div className="text-gray-500 flex items-center gap-2 mb-4 text-sm">
        <span>Ordered on {moment(order.createdAt).format("MM/DD/YYYY")}</span>
        <div className="bg-gray-400 w-[1px] h-[15px]"></div>
        <span>Order #{order._id}</span>
      </div>

      <div className="grid grid-cols-3 mb-6">
        <div>
          <h2 className="text-lg font-medium">Customer Info</h2>
          <p>
            <span className="text-gray-400">Name: </span>
          </p>
          <p>
            <span className="text-gray-400">Email: </span>
          </p>
          <p>
            <span className="text-gray-400">Phone: </span>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Shipping Address</h2>
          <p>
            <span className="text-gray-400">Address: </span>
            {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`}
          </p>
          <p>
            <span className="text-gray-400">Zip: </span>
            {order.shippingAddress.postalCode}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium">Payment Method</h2>
          <p>Visa ending in 1234</p>
        </div>
      </div>

      <h2 className="text-lg font-medium mb-2">Order Items</h2>

      <div className="flex flex-col gap-2 mb-4">
        {order.orderProducts.map((product) => (
          <CheckoutItem
            key={product._id}
            product={product}
            quantity={product.quantity}
          />
        ))}
      </div>

      <div className="pt-4 border-t border-gray-300 grid grid-cols-[1fr,10rem] justify-items-end gap-y-1">
        <p className="">Subtotal</p>
        <p className="">${order.total}</p>
        <p className="">Shipping</p>
        <p className="">${order.total}</p>
        <p className="text-xl font-semibold">Total</p>
        <p className="text-xl font-semibold">${order.total}</p>
      </div>
    </div>
  );
};

export default OrderDetailPage;
