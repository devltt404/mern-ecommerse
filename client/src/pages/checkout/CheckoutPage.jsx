import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SpinnerLoading } from "../../components/index.js";
import { getDetailedCart } from "../../redux/actions/cartAction.js";
import { cartSelector } from "../../redux/slices/cartSlice.js";
import CheckoutForm from "./components/CheckoutForm.jsx";
import CheckoutSummary from "./components/CheckoutSummary.jsx";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, cartLoading } = useSelector(cartSelector);

  useEffect(() => {
    dispatch(getDetailedCart());
  }, []);

  useEffect(() => {
    if (!cartLoading && cart.length === 0) {
      toast.error("Your cart is empty.");
    }
  }, [cartLoading, cart]);

  return cartLoading ? (
    <SpinnerLoading />
  ) : cart.length === 0 ? (
    <>
      <Navigate to="/" />
    </>
  ) : (
    cart[0]?.product && (
      <div className="container grid grid-cols-[55%_45%] gap-x-8 gap-y-12 py-8 lg:grid-cols-1">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    )
  );
};

export default CheckoutPage;
