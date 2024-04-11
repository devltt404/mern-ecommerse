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

  return detailedCart;
}
