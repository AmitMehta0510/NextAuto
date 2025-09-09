import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db.js";

import User from "./models/User.js";
import Product from "./models/Product.js";

await connectDB();

const seed = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});

    const admin = await User.create({
      name: "Admin",
      email: "admin@nextauto.test",
      password: "admin123", // will be hashed by pre-save
      role: "admin",
    });

    const user = await User.create({
      name: "Customer",
      email: "user@nextauto.test",
      password: "user123",
      role: "user",
    });

    const products = [
      {
        name: "Single Phase Motor Controller",
        description: "Power: 220V AC. Motor support up to 2HP.",
        price: 4999,
        category: "controller",
        image: "/images/motor-controller.png",
        stock: 20,
        statusBadge: "New",
        tags: ["motor", "controller"],
      },
      {
        name: "AMF Controller 2GS800",
        description: "Advanced MCU control, remote monitoring.",
        price: 6999,
        category: "controller",
        image: "/images/amf-2gs800.png",
        stock: 10,
        statusBadge: "Premium",
        tags: ["amf", "controller"],
      },
    ];

    await Product.insertMany(products);

    console.log("Seeded admin and products.");
    process.exit();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
