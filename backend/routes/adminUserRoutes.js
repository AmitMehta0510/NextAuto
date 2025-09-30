import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, adminOnly, getAllUsers)
  .post(protect, adminOnly, createUser);

router
  .route("/:id")
  .put(protect, adminOnly, updateUser)   // handles activate/deactivate
  .delete(protect, adminOnly, deleteUser);

export default router;
