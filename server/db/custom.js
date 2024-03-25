import Product from "../models/productModel.js";

const products = await Product.find({});
