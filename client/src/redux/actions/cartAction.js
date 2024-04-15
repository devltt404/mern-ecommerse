import toast from "react-hot-toast";
import { cartAxios } from "../../helpers/axiosInstances.js";
import { handleActionError } from "../../helpers/handleActionError.js";
import {
  setCart,
  setCartError,
  setCartLoading,
  setPropagatedCart,
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

    dispatch(setPropagatedCart(data));
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
      dispatch(setPropagatedCart(data));

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
    const { data } = await cartAxios.delete("/item/" + productId, {
      cart: getState().cart.cart,
    });

    if (!getState().user.user) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    dispatch(setPropagatedCart(data));
    toast.success("Item removed from cart");
  } catch (error) {
    handleActionError(dispatch, error, setCartError, true);
  }
};
