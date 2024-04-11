import toast from "react-hot-toast";
import { cartAxios } from "../../helpers/axiosInstances.js";
import { handleActionError } from "../../helpers/handleActionError.js";
import {
  setCart,
  setCartError,
  setCartLoading,
  setShipping,
  setSubtotal,
  setTotal,
} from "../slices/cartSlice.js";

export const addCartItem = (id, quantity) => async (dispatch, getState) => {
  try {
    dispatch(setCartLoading());
    const { user } = getState().user;

    const postBody = { productId: id, quantity };
    if (!user) postBody.cart = JSON.parse(localStorage.getItem("cart")) || [];
    const { data } = await cartAxios.post("/item", postBody);
    dispatch(setCart(data));

    if (!user) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          data.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        ),
      );
    }
    toast.success("Added to cart");
  } catch (error) {
    handleActionError(dispatch, error, setCartError, true);
  }
};

export const getDetailedCart = () => async (dispatch, getState) => {
  try {
    dispatch(setCartLoading());

    const { data } = await cartAxios.post("/detail", {
      cart: getState().cart.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    const subtotal = data.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const shipping = subtotal >= 35 ? 0 : 10;

    dispatch(setSubtotal(Number(subtotal.toFixed(2))));
    dispatch(setShipping(shipping));
    dispatch(setTotal(Number((subtotal + shipping).toFixed(2))));
    dispatch(setCart(data));
  } catch (error) {
    handleActionError(dispatch, error, setCartError, true);
  }
};

export const updateItemQuantity =
  ({ id, quantity }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setCartLoading());
      const { user } = getState().user;

      const putBody = {
        productId: id,
        quantity,
      };
      if (!user) putBody.cart = JSON.parse(localStorage.getItem("cart"));
      const { data } = await cartAxios.put("/item", putBody);
      dispatch(setCart(data));

      if (!user) {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            data.map((item) => ({
              productId: item.product._id,
              quantity: item.quantity,
            })),
          ),
        );
      }
      toast.success("Quantity updated");
    } catch (error) {
      handleActionError(dispatch, error, setCartError, true);
    }
  };

export const deleteCartItem = (productId) => async (dispatch, getState) => {
  try {
    dispatch(setCartLoading());
    const { cart } = getState().cart;
    const newCart = cart.filter((item) => item.product._id !== productId);

    if (getState().user.user) {
      await cartAxios.delete("/item/" + productId);
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    dispatch(setCart(newCart));
    toast.success("Item removed from cart");
  } catch (error) {
    handleActionError(dispatch, error, setCartError, true);
  }
};
