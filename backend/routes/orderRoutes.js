import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer creates new order
router.post("/", protect, createOrder);

// Customer fetches his own orders
router.get("/my-orders", protect, getMyOrders);

export default router;
