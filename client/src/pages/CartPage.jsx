import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem.jsx";
import CartSummary from "../components/CartSummary.jsx";
import Loading from "../components/Loading.jsx";
import { getDetailedCart } from "../redux/actions/cartAction.js";
import { cartSelector } from "../redux/slices/cartSlice.js";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart, cartLoading } = useSelector(cartSelector);

  useEffect(() => {
    if (cart.length > 0) {
      dispatch(getDetailedCart());
    }
  }, []);

  return (
    <div className="container py-4">
      <h1 className="font-semibold text-3xl mb-2">My Cart</h1>
      <p className="mb-4">You have {cart.length} items in your cart</p>

      {cartLoading ? (
        <Loading />
      ) : (
        <div className="flex gap-12">
          {cart[0]?.productDetail?.name && (
            <>
              <div className="flex flex-col gap-4">
                {cart.map((item) => {
                  return (
                    <CartItem
                      key={item.productId}
                      product={item.productDetail}
                      quantity={item.quantity}
                    />
                  );
                })}
              </div>
              <div className="flex-1">
                <CartSummary />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
