import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin user management
router.route("/")
  .get(protect, adminOnly, getAllUsers);

router.route("/:id")
  .get(protect, adminOnly, getUserProfile)
  .put(protect, adminOnly, updateUserProfile)
  .delete(protect, adminOnly, deleteUser);

export default router;
