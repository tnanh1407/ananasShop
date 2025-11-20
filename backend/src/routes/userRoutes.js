import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getByIdUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  updateUserController,
} from "../controllers/usersController.js";

const router = express.Router();
router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.get("/", getAllUsersController);
router.get("/:id", getByIdUserController);
router.delete("/:id", deleteUserController);
router.patch("/:id", updateUserController);
router.post("/logout", logoutUserController);
export default router;
