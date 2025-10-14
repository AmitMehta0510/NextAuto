import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adminContactRoutes from "./routes/adminContactRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
connectDB();

// middlewares
app.use(helmet());
app.use(express.json());

const allowedOrigins = process.env.CLIENT_ORIGIN?.split(",") || [];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or curl
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
// Admin APIs
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/contacts", adminContactRoutes);

// app.use("/api/admin/reports", )
app.get("/", (_req, res) => res.json({ ok: true, message: "NextAuto API" }));

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
