import { useSelector } from "react-redux";
import { Button } from "../../../components/index.js";
import { cartSelector } from "../../../redux/slices/cartSlice.js";
import CheckoutItem from "./CheckoutItem.jsx";

const CheckoutSummary = () => {
  const { cart, subtotal, shipping, total } = useSelector(cartSelector);
  return (
    <div className="h-fit border border-gray-300 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Order Summary</h2>
      <div className="mb-4 flex justify-between text-lg font-medium">
        <h3>Subtotal: </h3>
        <span>${subtotal}</span>
      </div>

      <div className="mb-4 flex flex-col gap-6">
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

      <div className="mb-4 flex justify-between text-lg font-medium">
        <h3>Shipping: </h3>
        <span>{shipping == 0 ? "Free" : "$" + shipping}</span>
      </div>

      <div className="mb-4 flex border-y border-y-gray-300 py-6 ">
        <input
          type="text"
          placeholder="Enter discount code"
          className="mr-2 flex-1 border border-gray-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
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
