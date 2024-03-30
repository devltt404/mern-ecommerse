import { useSelector } from "react-redux";
import { cartSelector } from "../redux/slices/cartSlice.js";
import Button from "./Button.jsx";
import CheckoutItem from "./CheckoutItem.jsx";

const CheckoutSummary = () => {
  const { cart, subtotal, shipping, total } = useSelector(cartSelector);
  return (
    <div className="p-6 border border-gray-300 h-fit">
      <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>
      <div className="flex justify-between mb-4 text-lg font-medium">
        <h3>Subtotal: </h3>
        <span>${subtotal}</span>
      </div>

      <div className="flex flex-col gap-6 mb-4">
        {cart.map((item) => {
          return (
            <CheckoutItem
              key={item.productId}
              product={item.productDetail}
              quantity={item.quantity}
            />
          );
        })}
      </div>

      <div className="flex justify-between mb-4 text-lg font-medium">
        <h3>Shipping: </h3>
        <span>{shipping == 0 ? "Free" : "$" + shipping}</span>
      </div>

      <div className="flex py-6 mb-4 border-y border-y-gray-300 ">
        <input
          type="text"
          placeholder="Enter discount code"
          className="flex-1 px-4 py-2 mr-2 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Button variant="fill" size="sm">
          APPLY
        </Button>
      </div>
      <div>
        <div className="flex justify-between text-2xl font-semibold">
          <h3>Total: </h3>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
