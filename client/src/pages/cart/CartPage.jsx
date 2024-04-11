import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerLoading } from "../../components/index.js";
import { getDetailedCart } from "../../redux/actions/cartAction.js";
import { cartSelector } from "../../redux/slices/cartSlice.js";
import CartItem from "./components/CartItem.jsx";
import CartSummary from "./components/CartSummary.jsx";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, cartLoading } = useSelector(cartSelector);

  useEffect(() => {
    if (cart.length > 0) {
      dispatch(getDetailedCart());
    }
  }, []);

  return (
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-semibold">My Cart</h1>
      <p className="mb-8">You have {cart.length} items in your cart</p>

      {cartLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="flex gap-16 xl:gap-8 lg:flex-col lg:gap-12">
          {cart[0]?.product?.name && (
            <>
              <div className="flex flex-1 flex-col gap-8">
                {cart.map((item) => {
                  return (
                    <CartItem
                      key={item.productId}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  );
                })}
              </div>

              <CartSummary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
