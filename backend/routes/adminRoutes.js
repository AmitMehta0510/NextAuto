import express from "express";
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
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

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const urls = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      urls.push(result.secure_url);
    }
    res.json({ urls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cloudinary upload failed" });
  }
});

export default router;
