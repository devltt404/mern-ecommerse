import Product from "../models/productModel.js";
import propagateCart from "../utils/propagteCart.js";

export const setCart = async (req, res, next) => {
  try {
    req.user.cart = req.body.cart;
    await req.user.save();
    res.status(200).json({ message: "User cart has been set." });
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400);
      throw new Error("Product ID and quantity are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const cart = req.user?.cart || req.body.cart;
    const existingItem = cart.find(
      (item) => item.productId.toString() === productId
    );

    if (
      (existingItem && existingItem.quantity + quantity > product.stock) ||
      quantity > product.stock
    ) {
      res.status(400);
      throw new Error("Not enough stock");
    }

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    req.user && (await req.user.save());
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getDetailedCart = async (req, res, next) => {
  try {
    const { cart } = req.body;

    res.status(200).json(await propagateCart(cart));
  } catch (error) {
    next(error);
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400);
      throw new Error("Product ID and quantity are required");
    }

    const product = Product.findById(productId);

    if (!product) {
      res.status(404);
      throw new Error("Item not found");
    }

    if (quantity > product.stock) {
      res.status(400);
      throw new Error("Not enough stock");
    }

    if (quantity <= 0) {
      res.status(400);
      throw new Error("Quantity must be greater than 0");
    }

    const cart = req.user?.cart || req.body.cart;
    const item = cart.find((item) => item.productId.toString() === productId);
    item.quantity = quantity;

    req.user && (await req.user.save());
    res.json(await propagateCart(cart));
  } catch (error) {
    next(error);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    const { id: productId } = req.params;

    if (!productId) {
      res.status(400);
      throw new Error("product ID is required");
    }

    const newCart = req.user.cart.filter(
      (item) => item.productId.toString() !== productId
    );
    if (newCart.length === req.user.cart.length) {
      res.status(404);
      throw new Error("Item not found");
    }

    req.user.cart = newCart;
    await req.user.save();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    next(error);
  }
};
