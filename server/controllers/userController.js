import axios from "axios";
import User from "../models/userModel.js";
import respondUserWithToken from "../utils/respondUserWithToken.js";

export const authGoogle = async (req, res, next) => {
  try {
    const { accessToken } = req.body;
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    const existedUser = await User.findOne({ email: data.email });
    if (existedUser) {
      if (existedUser.provider !== "google") {
        res.status(400);
        throw new Error(
          "Email has been registered with another provider. Please login with email and password"
        );
      }
      respondUserWithToken({
        user: existedUser,
        res,
      });
    } else {
      const user = await User.create({
        name: data.name,
        email: data.email,
        avatar: data.picture,
        provider: "google",
      });
      respondUserWithToken({ user, res });
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const errorDetail = {};
  try {
    const { email, password } = req.body;

    if (!email) errorDetail.email = "Please provide an email";
    if (!password) errorDetail.password = "Please provide a password";
    if (Object.keys(errorDetail).length) {
      res.status(400);
      throw new Error(`Login failed.`);
    }

    const user = await User.findOne({ email }).select("+password");

    if (user) {
      if (user.provider !== "email") {
        errorDetail.email = "Email has been registered with another provider.";
        res.status(400);
        throw new Error(`Login failed.`);
      } else if (await user.matchPassword(password)) {
        return respondUserWithToken({ user, res });
      }
    }

    errorDetail.email = "Invalid email or password";
    errorDetail.password = "Invalid email or password";
    res.status(400);
    throw new Error(`Login failed.`);
  } catch (error) {
    if (Object.keys(errorDetail).length) error.detail = errorDetail;
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  const errorDetail = {};
  try {
    const { name, email, password } = req.body;

    if (!name) errorDetail.name = "Please provide a name";
    if (!email) errorDetail.email = "Please provide an email";
    if (!password) errorDetail.password = "Please provide a password";
    if (Object.keys(errorDetail).length) {
      res.status(400);
      throw new Error(`Registration failed.`);
    }

    const isUserExisted = await User.findOne({ email }).lean();
    if (isUserExisted) {
      errorDetail.email = "Email has been already used";
      res.status(400);
      throw new Error(`Registration failed.`);
    }

    const user = await User.create({
      name,
      email,
      password,
      provider: "email",
    });
    respondUserWithToken({ user, res });
  } catch (error) {
    if (Object.keys(errorDetail).length) error.detail = errorDetail;
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
      user: { _id: req.user._id, name: req.user.name, role: req.user.role },
      cart: req.user.cart,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    res.status(200).json({
      user: { _id: req.user._id, name: req.user.name },
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
    respondUserWithToken({ user: req.user, successMsg: "user updated", res });
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
      throw new Error("user not found");
    }

    await user.deleteOne();
    res.status(200).json({ message: "user deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    let { page, limit } = req.query;
    page = Number(page);

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
      throw new Error("product not found");
    }

    const { image } = req.body;
    user.avatar = image;
    await user.save();

    res.status(200).json({ message: "user avatar updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const setRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }

    if (user.role === "admin") {
      user.role = "user";
    } else {
      user.role = "admin";
    }
    await user.save();

    res.status(200).json({ message: "user role updated successfully" });
  } catch (error) {
    next(error);
  }
};
