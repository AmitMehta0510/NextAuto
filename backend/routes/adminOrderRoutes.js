import express from "express";
import {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Admin: fetch all orders
router.route("/")
  .get(protect, adminOnly, getOrders);

// ✅ Admin: single order management
router.route("/:id")
  .get(protect, adminOnly, getOrderById)
  .put(protect, adminOnly, updateOrder)
  .delete(protect, adminOnly, deleteOrder);

export default router;
