import express from "express";
import {
  createContact
} from "../controllers/contactController.js";

const router = express.Router();

// Public route - anyone can send message
router.post("/", createContact);

export default router;
