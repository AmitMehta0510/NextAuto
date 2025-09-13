// import express from "express";
// import {
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.route("/")
//   .get(protect, adminOnly, getUsers);

// router.route("/:id")
//   .get(protect, adminOnly, getUserById)
//   .put(protect, adminOnly, updateUser)
//   .delete(protect, adminOnly, deleteUser);

// export default router;

/*
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
*/

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
