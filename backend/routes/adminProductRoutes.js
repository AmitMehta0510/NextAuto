import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin product management
router.route("/")
  .get(protect, adminOnly, getProducts)   // list all products
  .post(protect, adminOnly, createProduct); // create product

router.route("/:id")
  .get(protect, adminOnly, getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

export default router;
