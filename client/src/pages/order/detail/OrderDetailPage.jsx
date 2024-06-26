import moment from "moment";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerLoading } from "../../../components/index.js";
import { getOrder } from "../../../redux/actions/orderAction.js";
import { orderSelector } from "../../../redux/slices/orderSlice.js";
import { userSelector } from "../../../redux/slices/userSlice.js";
import CheckoutItem from "../../checkout/components/CheckoutItem.jsx";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, orderLoading } = useSelector(orderSelector);
  const { user } = useSelector(userSelector);

  const effectFunction = async () => {
    await dispatch(getOrder(id));
    if (order.userId && order.userId !== user._id) {
      navigate("/");
      toast.error("You are not authorized to view this page");
    }
  };

  useEffect(() => {
    effectFunction();
  }, []);

  return orderLoading ? (
    <SpinnerLoading />
  ) : (
    order && (
      <div className="container py-8">
        <h1 className="mb-2 text-3xl font-semibold">Order Detail</h1>

        <div className="mb-4 flex gap-2 text-sm text-gray-500 sm:flex-col min-sm:items-center">
          <span>
            Ordered on {moment(order.createdAt).format("MM/DD/YYYY - hh:mm A")}
          </span>

          <div className="h-[15px] w-[1px] bg-gray-400 sm:hidden"></div>

          <span>Order #{order._id}</span>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium">Customer Info</h2>
            <p>
              <span className="text-gray-500">Name: </span>
              {order.customer.firstName + " " + order.customer.lastName}
            </p>
            <p>
              <span className="text-gray-500">Email: </span>
              {order.customer.email}
            </p>
            <p>
              <span className="text-gray-500">Phone: </span>
              {order.customer.phone}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium">Shipping Address</h2>
            <p>
              <span className="text-gray-500">Address: </span>
              {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state}`}
            </p>
            <p>
              <span className="text-gray-500">Zip: </span>
              {order.shippingAddress.postalCode}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium">Payment Method</h2>
            <p className="flex items-center gap-2">
              <svg
                width="30px"
                height="30px"
                viewBox="0 -140 780 780"
                enableBackground="new 0 0 780 500"
                version="1.1"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="780" height="500" fill="#0E4595" />
                <path
                  d="m293.2 348.73l33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-0.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-0.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882 0.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-0.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555 0.084 68.338 0.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-0.316 0.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41l-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-0.064 84.004-195.39h-56.521"
                  fill="#ffffff"
                />
                <path
                  d="m146.92 152.96h-86.041l-0.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527"
                  fill="#F2AE14"
                />
              </svg>
              Visa ending in {order.payment.detail}
            </p>
          </div>
        </div>

        <h2 className="mb-3 text-xl font-medium">Order Items</h2>

        <div className="mb-4 flex flex-col gap-4">
          {order.orderProducts.map((product) => (
            <CheckoutItem
              key={product._id}
              product={product}
              quantity={product.quantity}
            />
          ))}
        </div>

        <div className="grid grid-cols-[1fr,10rem] justify-items-end gap-y-1 border-t border-gray-300 pt-4">
          <p className="">Subtotal</p>
          <p className="">${order.total}</p>
          <p className="">Shipping</p>
          <p className="">${order.total}</p>
          <p className="text-xl font-semibold">Total</p>
          <p className="text-xl font-semibold">${order.total}</p>
        </div>
      </div>
    )
  );
};

export default OrderDetailPage;
