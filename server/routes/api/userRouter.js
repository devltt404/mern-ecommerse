import express from "express";
import {
  authGoogle,
  deleteUser,
  getAdmin,
  getUser,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  setRole,
  updateUser,
} from "../../controllers/userController.js";
import {
  decodeToken,
  isAdmin,
  isUser,
  isUserPermitted,
} from "../../middlewares/authToken.js";
const userRouter = express.Router();

userRouter.post("/google", authGoogle);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/auth", decodeToken, isUser, getUser);
userRouter.get("/auth-admin", decodeToken, isAdmin, getAdmin);

userRouter.get("/", decodeToken, isAdmin, getUsers);
userRouter.put("/avatar/:id", decodeToken, isUserPermitted, deleteUser);
userRouter.put("/role/:id", decodeToken, isAdmin, setRole);
userRouter.put("/:id", decodeToken, isAdmin, updateUser);
userRouter.delete("/:id", decodeToken, isAdmin, deleteUser);

export default userRouter;
