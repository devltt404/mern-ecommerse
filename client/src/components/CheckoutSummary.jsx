import { useSelector } from "react-redux";
import { cartSelector } from "../redux/slices/cartSlice.js";
import Button from "./Button.jsx";
import CheckoutItem from "./CheckoutItem.jsx";

const CheckoutSummary = () => {
  const { cart, subtotal, shipping, total } = useSelector(cartSelector);
  return (
    <div className="border-l border-l-gray-300 pl-10 w-[25rem]">
      <h2 className="font-semibold text-2xl mb-6">Order Summary</h2>
      <div className="flex justify-between text-lg font-medium mb-4">
        <h3>Subtotal: </h3>
        <span>${subtotal}</span>
      </div>

      <div className="flex flex-col gap-4 mb-4">
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

      <div className="flex justify-between text-lg font-medium mb-4">
        <h3>Shipping: </h3>
        <span>{shipping == 0 ? "Free" : "$" + shipping}</span>
      </div>

      <div className="flex py-6 mb-4 border-y border-y-gray-300 ">
        <input
          type="text"
          placeholder="Enter discount code"
          className="flex-1 bg-white border border-gray-300 py-2 px-4 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Button variant="fill">APPLY</Button>
      </div>
      <div>
        <div className="flex justify-between text-2xl font-medium mb-4">
          <h3>Total: </h3>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
