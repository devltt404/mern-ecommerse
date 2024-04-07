import Product from "../models/productModel.js";

export const setCart = async (req, res, next) => {
  try {
    req.user.cart = req.body.cart;
    await req.user.save();
    res.status(200).json({ message: "user cart has been set." });
  } catch (error) {
    next(error);
  }
};

export const addCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      res.status(400);
      throw new Error("product ID and quantity are required");
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("product not found");
    }

    const existingItem = req.user.cart.find(
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
      req.user.cart.push({ productId, quantity: quantity });
    }

    await req.user.save();
    res.status(201).json(req.user.cart);
  } catch (error) {
    next(error);
  }
};

export const getDetailedCart = async (req, res, next) => {
  try {
    const { cart } = req.body;
    const getItemDetailPromises = cart.map((item) => {
      return Product.findById(item.productId)
        .select("name price category stock images")
        .populate("category")
        .lean();
    });
    const itemsDetail = await Promise.all(getItemDetailPromises);

    const detailedCart = itemsDetail.map((item, index) => {
      return { ...cart[index], productDetail: item };
    });
    res.status(200).json(detailedCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartItemQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400);
      throw new Error("product ID and quantity are required");
    }

    const existingItem = Product.findById(productId);

    if (!existingItem) {
      res.status(404);
      throw new Error("Item not found");
    }

    const product = Product.findById(existingItem.productId);
    if (quantity > product.stock) {
      res.status(400);
      throw new Error("Not enough stock");
    }

    existingItem.quantity = quantity;
    await req.user.save();
    res.json({ message: "cart updated" });
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
