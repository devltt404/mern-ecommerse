import Category from "../models/categoryModel.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req, res, next) => {
  try {
    const { newCategory } = req.body;
    const category = await Category.create({ name: newCategory });
    res.status(201).json({ message: "Category created successfully" });
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
      res.status(200).json({ message: "Category updated successfully" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (category) {
      await category.remove();
      res.status(200).json({ message: "Category deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Category not found");
    }
  } catch (error) {
    next(error);
  }
};
