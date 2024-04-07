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
    const { category } = req.body;
    await Category.create({ name: category });
    const categories = await Category.find();
    res.status(201).json(categories);
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

    if (category) {
      await category.deleteOne();
      const categories = await Category.find();
      res.status(200).json(categories);
    } else {
      res.status(404);
      throw new Error("category not found");
    }
  } catch (error) {
    next(error);
  }
};
