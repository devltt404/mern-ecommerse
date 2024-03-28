import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSelector } from "../redux/slices/cartSlice.js";
import Button from "./Button.jsx";

const CartSummary = () => {
  const { subtotal, shipping, total } = useSelector(cartSelector);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-black text-white ">
      <h1 className="font-medium text-2xl">Cart Summary</h1>
      <div className="flex justify-between py-6 font-medium text-lg border-b border-b-gray-500">
        <h2 className="text-gray-200">Subtotal</h2>
        <p>${subtotal}</p>
      </div>
      <div className="flex justify-between py-6 font-medium border-b border-b-gray-500">
        <div>
          <h2 className="text-gray-200 mb-1">Shipping</h2>
          <p className="font-normal text-gray-200 text-sm">
            Free shipping for Order $35+
          </p>
        </div>
        <p>{shipping == 0 ? "Free" : "$" + shipping}</p>
      </div>
      <div className="flex justify-between pt-6 pb-4 font-bold text-xl">
        <h2>Total</h2>
        <p>${total}</p>
      </div>
      <div className="flex">
        <Button
          width="full"
          variant="inverse-fill"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
