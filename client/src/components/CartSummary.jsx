import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartSelector } from "../redux/slices/cartSlice.js";
import Button from "./Button.jsx";

const CartSummary = () => {
  const { subtotal, shipping, total } = useSelector(cartSelector);
  const navigate = useNavigate();

  return (
    <div className="p-6 text-white bg-black w-[26rem] xl:w-[22rem] lg:w-full h-fit">
      <h1 className="text-2xl font-medium">Cart Summary</h1>
      <div className="flex justify-between py-6 text-lg font-medium border-b border-b-gray-500">
        <h2 className="text-gray-200">Subtotal</h2>
        <p>${subtotal}</p>
      </div>
      <div className="flex justify-between py-6 font-medium border-b border-b-gray-500">
        <div>
          <h2 className="mb-1 text-gray-200">Shipping</h2>
          <p className="text-sm font-normal text-gray-200">
            Free shipping for Order $35+
          </p>
        </div>
        <p>{shipping == 0 ? "Free" : "$" + shipping}</p>
      </div>
      <div className="flex justify-between pt-6 pb-4 text-xl font-bold">
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
