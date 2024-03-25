import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  getUserOrders,
} from "../../controllers/orderController.js";
import { decodeToken, isUser } from "../../middlewares/authToken.js";
const orderRouter = express.Router();

orderRouter.post("/", decodeToken, createOrder);
orderRouter.get("/", decodeToken, getOrders);
orderRouter.get("/user", decodeToken, isUser, getUserOrders);
orderRouter.get("/:id", decodeToken, getOrderById);

export default orderRouter;
