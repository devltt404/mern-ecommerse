import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export default async function getCategoriesWithCount() {
  const categoriesWithCount = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        numProducts: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $project: {
        _id: "$category._id",
        name: "$category.name",
        numProducts: 1,
      },
    },
  ]);
  const categories = await Category.find().lean();

  return categories.map((category) => {
    const categoryWithCount = categoriesWithCount.find(
      (count) => count._id.toString() === category._id.toString()
    );
    category.numProducts = categoryWithCount
      ? categoryWithCount.numProducts
      : 0;
    return category;
  });
}
