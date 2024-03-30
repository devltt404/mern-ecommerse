import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const decodeToken = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
  } catch (error) {
    next();
  }
};

export const isUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(401).json({ message: "Unauthorized as an admin" });
  }
  next();
};

export const isUserPermitted = async (req, res, next) => {
  try {
    (req, res, next) => {
      if (req.user._id === req.params.id || req.user.role === "admin") {
        return next();
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    };
  } catch (error) {
    next(error);
  }
};
