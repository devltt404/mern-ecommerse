import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  updateProductImage,
} from "../../controllers/productController.js";
import { decodeToken, isAdmin } from "../../middlewares/authToken.js";
const productRouter = express.Router();

productRouter.get("/:id", getProductById);
productRouter.get("/", getProducts);
productRouter.post("/", addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

productRouter.put("/image/:id", decodeToken, isAdmin, updateProductImage);

export default productRouter;
