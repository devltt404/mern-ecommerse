import User from "../models/userModel.js";
import respondWithToken from "../utils/respondWithToken.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide an email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (user && (await user.matchPassword(password))) {
      respondWithToken({ user, successMsg: "Login successful", res });
    } else {
      res.status(400);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide a name, email and password");
    }

    const isUserExisted = await User.findOne({ email }).lean();
    if (isUserExisted) {
      res.status(400);
      throw new Error("Email has been already used");
    }

    const user = await User.create({ name, email, password });
    respondWithToken({ user, successMsg: "User created successfully", res });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", "").status(200).json({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: { id: req.user._id, name: req.user.name, role: req.user.role },
      cart: req.user.cart,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    res.status(200).json({
      user: { id: req.user._id, name: req.user.name },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    req.user.name = name;
    await req.user.save();
    respondWithToken({ user: req.user, successMsg: "User updated", res });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      users,
      pagination: { totalPages: Math.ceil(totalUsers / limit), page },
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("Product not found");
    }

    const { image } = req.body;
    user.avatar = image;
    await user.save();

    res.status(200).json({ message: "User avatar updated successfully" });
  } catch (error) {
    next(error);
  }
};
