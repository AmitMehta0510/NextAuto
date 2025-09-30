import express from "express";
import {
  getAllUsers,
  deleteUser,
  promoteUserToAdmin,
  demoteUserToNormal 
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";
import { getSalesReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/:id/promote", protect, adminOnly, promoteUserToAdmin);
router.put("/users/:id/demote", protect, adminOnly, demoteUserToNormal);

router.get("/stats", protect, adminOnly, getAdminStats);
router.get("/reports/sales", protect, adminOnly, getSalesReport);
export default router;
