import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin user management
router
  .route("/")
  .get(protect, adminOnly, getAllUsers)
  .post(protect, adminOnly, createUser);

router
  .route("/:id")
  .get(protect, adminOnly, getUserProfile)
  .put(protect, adminOnly, updateUser)
  .delete(protect, adminOnly, deleteUser);

export default router;
