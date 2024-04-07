import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import fillSalesData from "../utils/fillSalesData.js";
import {chargeOrder} from "../utils/paypal.js";

export const createOrder = async (req, res, next) => {
    try {
        let {
            billingAddress,
            shippingAddress,
            card,
            cart,
            useSameAddress,
            customer,
        } = req.body;

        let subtotal = 0;

        cart = req.user?.cart || cart;

        if (cart.length === 0) {
            res.status(400);
            throw new Error("cart is empty.");
        }

        const products = await Promise.all(
            cart.map((item) => {
                return Product.findById(item.productId);
            })
        ).catch(() => {
            res.status(404);
            throw new Error("There's an invalid product.");
        });

        const orderProducts = products.map((product, index) => {
            if (product.stock < cart[index].quantity) {
                res.status(400);
                throw new Error("There's not enough stock.");
            }

            subtotal = subtotal + product.price * cart[index].quantity;

            return {
                productId: product._id,
                quantity: cart[index].quantity,
                name: product.name,
                price: product.price,
                image: product.images[0],
            };
        });

        const order = {
            userId: req.user ? req.user._id : null,
            orderProducts,
            subtotal: Number(subtotal.toFixed(2)),
            shipping: subtotal >= 35 ? 0 : 10,
            total: subtotal >= 35 ? subtotal : subtotal + 10,
            shippingAddress,
            customer,
            payment: {},
        };

        order.payment.detail = card.number.slice(-4);

        order.payment.id = await chargeOrder({
            totalCharge: subtotal,
            card,
            billingAddress: useSameAddress ? shippingAddress : billingAddress,
        });

        const createdOrder = await Order.create(order);

        const dbPromises = [];

        if (req.user) {
            req.user.orders.unshift(createdOrder._id);
            req.user.cart = [];
            dbPromises.push(req.user.save());
        }

        products.forEach(async (product, index) => {
            product.stock = product.stock - cart[index].quantity;
            product.numSold = product.numSold + cart[index].quantity;
            await product.save();
            dbPromises.push(product.save());
        });

        await Promise.all(dbPromises);

        res.status(201).json(createdOrder);
    } catch (error) {
        next(error);
    }
};

export const getUserOrders = async (req, res, next) => {
    try {
        await req.user.populate("orders");

        res.status(200).json(
            req.user.orders.map((order) => {
                return {
                    _id: order._id,
                    total: order.total,
                    createdAt: order.createdAt,
                    shippingAddress: order.shippingAddress,
                    orderProducts: order.orderProducts,
                };
            })
        );
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        let {page = 1, limit = 5} = req.query;
        page = Number(page);

        const orders = await Order.find()
            .limit(limit)
            .skip(limit * (page - 1))
            .populate("userId")
            .lean();

        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            orders: orders.map((order) => {
                return {
                    _id: order._id,
                    total: order.total,
                    createdAt: order.createdAt,
                    shippingAddress: order.shippingAddress,
                };
            }),
            totalOrders,
            pagination: {
                page: page,
                totalPages: Math.ceil(totalOrders / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const order = await Order.findById(id).lean();
        if (!order) {
            res.status(404);
            throw new Error("order not found.");
        }

        if (
            (!req.user && order.userId) ||
            (req.user &&
                req.user.role !== "admin" &&
                req.user._id.toString() !== order.userId.toString())
        ) {
            res.status(403);
            throw new Error("You are not authorized to view this order.");
        }

        res.status(200).json({
            _id: order._id,
            createdAt: order.createdAt,
            shippingAddress: order.shippingAddress,
            orderProducts: order.orderProducts,
            customer: order.customer,
            subtotal: order.subtotal,
            shipping: order.shipping,
            total: order.total,
            payment: order.payment,
        });
    } catch (error) {
        next(error);
    }
};

export const getSalesData = async (req, res, next) => {
    try {
        let {duration} = req.query;

        const time = (duration === "week" ? 7 : 365) * 86400000;

        const salesData = await Order.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date() - time),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: duration === "week" ? "%b %d" : "%b",
                            date: "$createdAt",
                        },
                    },
                    totalSales: {$sum: "$total"},
                },
            },
            {$set: {totalSales: {$round: ["$totalSales", 2]}}},
            {$sort: {_id: 1}},
        ]);

        res.status(200).json(fillSalesData(salesData, duration));
    } catch (error) {
        next(error);
    }
};
