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

    if (!user) {
      const { cart } = getState().cart;
      let newCart = cart.map(({ productDetail, ...rest }) => rest);

      const existingItem = newCart.find((item) => item.productId === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.push({ productId: id, quantity });
      }

      dispatch(setCart(newCart));
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const { data } = await cartAxios.post("/item", {
        productId: id,
        quantity,
      });
      dispatch(setCart(data));
    }
    toast.success("Added to cart");
  } catch (error) {
    handleActionError(dispatch, error, setCartError, true);
  }
};

export const getDetailedCart = () => async (dispatch, getState) => {
  try {
    dispatch(setCartLoading());

    const { data: cart } = await cartAxios.post("/detail", {
      cart: getState().cart.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    });

    const subtotal = cart.reduce((acc, item) => {
      return acc + item.productDetail.price * item.quantity;
    }, 0);

    const shipping = subtotal >= 35 ? 0 : 10;

    dispatch(setSubtotal(Number(subtotal.toFixed(2))));
    dispatch(setShipping(shipping));
    dispatch(setTotal(Number((subtotal + shipping).toFixed(2))));
    dispatch(setCart(cart));
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
      const { cart } = getState().cart;

      if (!user) {
        const updatedCart = cart.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity };
          }
          return item;
        });
        dispatch(setCart(updatedCart));
        localStorage.setItem(
          "cart",
          JSON.stringify(
            updatedCart.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          ),
        );
      } else {
        await cartAxios.put("/item", { productId: id, quantity: quantity });
        dispatch(
          setCart(
            cart.map((item) => {
              if (item.productId === id) {
                return { ...item, quantity };
              }
              return item;
            }),
          ),
        );
      }
    } catch (error) {
      handleActionError(dispatch, error, setCartError, true);
    }
  };

export const deleteCartItem = (productId) => async (dispatch, getState) => {
  try {
    dispatch(setCartLoading());
    const { cart } = getState().cart;
    const newCart = cart.filter((item) => item.productId !== productId);

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
