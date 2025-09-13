// import express from "express";
// import { getAdminStats } from "../controllers/adminController.js";
// import { getSalesReport } from "../controllers/reportController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/stats", protect, adminOnly, getAdminStats);
// router.get("/reports/sales", protect, adminOnly, getSalesReport);

// export default router;

import express from "express";
import {
  getAllUsers,
  deleteUser,
  promoteUserToAdmin,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.put("/users/:id/promote", protect, adminOnly, promoteUserToAdmin);

export default router;
