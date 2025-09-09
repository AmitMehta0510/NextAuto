import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route - anyone can send message
router.post("/", createContact);

// Admin route - only admins can view all messages
router.get("/", protect, adminOnly, getContacts);

export default router;
