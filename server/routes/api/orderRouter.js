import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  getSalesData,
  getUserOrders,
} from "../../controllers/orderController.js";
import { decodeToken, isAdmin, isUser } from "../../middlewares/authToken.js";
const orderRouter = express.Router();

orderRouter.post("/", decodeToken, createOrder);
orderRouter.get("/", decodeToken, isUser, getOrders);

orderRouter.get("/user", decodeToken, isUser, getUserOrders);
orderRouter.get("/sales", decodeToken, isAdmin, getSalesData);

orderRouter.get("/:id", decodeToken, getOrderById);

export default orderRouter;
