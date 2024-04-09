import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import getCategoriesWithCount from "../utils/getCategoriesWithCount.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const getDetailedCategories = async (req, res, next) => {
  try {
    const productsCount = await getCategoriesWithCount();
    res.status(200).json(productsCount);
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const createdCategory = await Category.create({ name: category });
    res.status(201).json({
      numProducts: 0,
      name: createdCategory.name,
      _id: createdCategory._id,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;
    const category = Category.findById(id);

    if (category) {
      category.name = newName;
      const updatedCategory = await category.save();
      res.status(200).json({ message: "Updated successfully" });
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    const product = await Product.findOne({ category: id });
    if (product) {
      res.status(400);
      throw new Error("Cannot delete category with products");
    }

    if (category) {
      await category.deleteOne();
      const productsCount = await getCategoriesWithCount();
      res.status(200).json(productsCount);
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  } catch (error) {
    next(error);
  }
};
