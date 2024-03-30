import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm.jsx";
import CheckoutSummary from "../components/CheckoutSummary.jsx";
import Loading from "../components/Loading.jsx";
import { getDetailedCart } from "../redux/actions/cartAction.js";
import { cartSelector } from "../redux/slices/cartSlice.js";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, cartLoading } = useSelector(cartSelector);

  useEffect(() => {
    dispatch(getDetailedCart());
  }, []);

  return cartLoading ? (
    <Loading />
  ) : cart.length === 0 ? (
    <>
      <Navigate to="/" />
    </>
  ) : (
    cart[0]?.productDetail && (
      <div className="container grid py-8 grid-cols-[55%_45%] lg:grid-cols-1 gap-y-12 gap-x-8">
        <CheckoutForm />
        <CheckoutSummary />
      </div>
    )
  );
};

export default CheckoutPage;
