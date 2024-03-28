import Product from "../models/productModel.js";

export const getProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, minRating, keyword, page, limit } =
      req.query;
    if (!page || !limit) {
      res.status(400);
      throw new Error("Please provide page and limit parameters");
    }

    const filterOptions = {};
    if (category) {
      filterOptions.category = category;
    }
    if (minPrice) {
      filterOptions.price = { $gte: minPrice };
    }
    if (maxPrice) {
      filterOptions.price = { ...filterOptions.price, $lte: maxPrice };
    }
    if (minRating) {
      filterOptions.rating = { $gte: minRating };
    }
    if (keyword) {
      filterOptions.name = { $regex: keyword, $options: "i" };
    }

    const products = await Product.find(filterOptions)
      .populate("category")
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const numProducts = await Product.countDocuments(filterOptions);

    res.status(200).json({
      products: products.map((product) => {
        const {
          _id,
          name,
          price,
          category,
          quantity,
          images,
          rating,
          numOfReviews,
          stock,
          numSold,
        } = product;
        return {
          _id,
          name,
          price,
          category,
          quantity,
          images,
          rating,
          numOfReviews,
          stock,
          numSold,
        };
      }),
      pagination: {
        page: Number(page),
        totalPages: Math.ceil(numProducts / limit),
      },
      totalProducts: numProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.populate(["category", "reviews"]);
    await product.populate("reviews.userId");
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404);
      error.message = "Product not found";
    }
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, images } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    const { image } = req.body;
    product.images[0] = image;
    await product.save();

    res.status(200).json({ message: "Product image updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, images } = req.body;
    const product = await Product.findById(id);

    if (product) {
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;
      product.stock = stock;
      product.images = images;
      const updatedProduct = await product.save();
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    next(error);
  }
};

export const getProductsForIndexPage = async (req, res, next) => {
  try {
    const getProductsPromises = [];
    const selectedFields = {
      name: 1,
      numSold: 1,
      images: 1,
      category: 1,
      rating: 1,
      price: 1,
    };
    getProductsPromises.push(
      Product.aggregate([
        {
          $sort: { numSold: -1 },
        },
        {
          $limit: 4,
        },
        {
          $project: selectedFields,
        },
      ])
    );

    getProductsPromises.push(
      Product.aggregate([
        {
          $sort: { rating: -1 },
        },
        {
          $limit: 4,
        },
        {
          $project: selectedFields,
        },
      ])
    );

    getProductsPromises.push(
      Product.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 8,
        },
        {
          $project: selectedFields,
        },
      ])
    );

    const products = await Promise.all(getProductsPromises);
    const populatePromises = products.map((product) => {
      return Product.populate(product, { path: "category" });
    });

    const detailedProducts = await Promise.all(populatePromises);

    res.status(200).json({
      bestSelling: detailedProducts[0],
      topRated: detailedProducts[1],
      latestProducts: detailedProducts[2],
    });
  } catch (error) {
    next(error);
  }
};
