import express from "express";
import {
  addCartItem,
  deleteCartItem,
  getDetailedCart,
  setCart,
  updateCartItemQuantity,
} from "../../controllers/cartController.js";
import { decodeToken, isUser } from "../../middlewares/authToken.js";
const cartRouter = express.Router();

cartRouter.post("/", decodeToken, isUser, setCart);
cartRouter.post("/detail", decodeToken, getDetailedCart);
cartRouter.post("/item", decodeToken, addCartItem);
cartRouter.put("/item", decodeToken, updateCartItemQuantity);
cartRouter.delete("/item/:id", decodeToken, isUser, deleteCartItem);

export default cartRouter;
