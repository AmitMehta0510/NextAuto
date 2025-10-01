import express from "express";
import {
  getContacts,
  deleteContact,
  getContactById
} from "../controllers/contactController.js";
import { protect, adminOnly  } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin route - only admins can view all messages
router.get("/", protect, adminOnly, getContacts);

router.get("/:id", getContactById);

// Delete a contact (Admin only)
router.delete("/:id", protect, adminOnly, deleteContact);


export default router;
