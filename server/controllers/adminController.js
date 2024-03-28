import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

export const getStats = async (req, res, next) => {
  try {
    const getStatsPromises = [];
    getStatsPromises.push(User.countDocuments());
    getStatsPromises.push(Product.countDocuments());
    getStatsPromises.push(Order.countDocuments());

    getStatsPromises.push(
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }])
    );

    getStatsPromises.push(
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%b %d", date: "$createdAt" } },
            totalSales: { $sum: "$total" },
          },
        },
        { $sort: { _id: 1 } },
      ])
    );

    getStatsPromises.push(
      Product.aggregate([
        {
          $sort: { numSold: -1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            name: 1,
            numSold: 1,
            images: 1,
            category: 1,
          },
        },
      ])
    );

    const stats = await Promise.all(getStatsPromises);

    res.status(200).json({
      totalUsers: stats[0],
      totalProducts: stats[1],
      totalOrders: stats[2],
      totalSales: stats[3][0].total,
      salesInPastWeek: stats[4],
      bestSellingProducts: stats[5],
    });
  } catch (error) {
    next(error);
  }
};
