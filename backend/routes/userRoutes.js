import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  promoteUserToAdmin,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ------------------- Public Routes -------------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// ------------------- Private Routes -------------------
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// ------------------- Admin Routes -------------------
router.get("/admin/users", protect, adminOnly, getAllUsers);
router.delete("/admin/users/:id", protect, adminOnly, deleteUser);
router.put("/admin/users/:id/promote", protect, adminOnly, promoteUserToAdmin);

export default router;
