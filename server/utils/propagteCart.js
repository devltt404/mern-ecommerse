import Product from "../models/productModel.js";

export default async function propagateCart(cart) {
  const getItemDetailPromises = cart.map((item) => {
    return Product.findById(item.productId)
      .select("name price category stock images")
      .populate("category")
      .lean();
  });
  const itemsDetail = await Promise.all(getItemDetailPromises);

  const detailedCart = itemsDetail.map((item, index) => {
    return {
      quantity: cart[index].quantity,
      product: item,
      productId: item._id,
    };
  });
  const subtotal = parseFloat(
    detailedCart
      .reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0)
      .toFixed(2)
  );
  const shipping = subtotal >= 35 ? 0 : 10;
  const total = parseFloat((subtotal + shipping).toFixed(2));
  return { cart: detailedCart, subtotal, shipping, total };
}
