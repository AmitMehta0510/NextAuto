import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  promoteUserToAdmin,
  demoteUserToNormal,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Private
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin
router.put("/admin/users/:id/promote", protect, adminOnly, promoteUserToAdmin);
router.put("/admin/users/:id/demote", protect, adminOnly, demoteUserToNormal);

export default router;
