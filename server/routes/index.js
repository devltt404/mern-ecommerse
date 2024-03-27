import express from "express";
import adminRouter from "./api/adminRouter.js";
import cartRouter from "./api/cartRouter.js";
import categoryRouter from "./api/categoryRouter.js";
import orderRouter from "./api/orderRouter.js";
import productRouter from "./api/productRouter.js";
import reviewRouter from "./api/reviewRouter.js";
import userRouter from "./api/userRouter.js";

const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/review", reviewRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/admin", adminRouter);

export default apiRouter;
