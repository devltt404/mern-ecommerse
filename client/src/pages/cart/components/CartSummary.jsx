import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/index.js";
import { cartSelector } from "../../../redux/slices/cartSlice.js";

const CartSummary = () => {
  const { subtotal, shipping, total } = useSelector(cartSelector);
  const navigate = useNavigate();

  return (
    <div className="h-fit w-[26rem] bg-black p-6 text-white xl:w-[22rem] lg:w-full">
      <h1 className="text-2xl font-medium">Cart Summary</h1>
      <div className="flex justify-between border-b border-b-gray-500 py-6 text-lg font-medium">
        <h2 className="text-gray-200">Subtotal</h2>
        <p>${subtotal}</p>
      </div>
      <div className="flex justify-between border-b border-b-gray-500 py-6 font-medium">
        <div>
          <h2 className="mb-1 text-gray-200">Shipping</h2>
          <p className="text-sm font-normal text-gray-200">
            Free shipping for Order $35+
          </p>
        </div>
        <p>{shipping == 0 ? "Free" : "$" + shipping}</p>
      </div>
      <div className="flex justify-between pb-4 pt-6 text-xl font-bold">
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
