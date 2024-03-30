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
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-semibold">My Cart</h1>
      <p className="mb-8">You have {cart.length} items in your cart</p>

      {cartLoading ? (
        <Loading />
      ) : (
        <div className="flex gap-16 xl:gap-8 lg:flex-col lg:gap-12">
          {cart[0]?.productDetail?.name && (
            <>
              <div className="flex flex-col flex-1 gap-8">
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

              <CartSummary />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
