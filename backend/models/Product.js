import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, default: "other" },
    images: [{ type: String, required: true }],
    stock: { type: Number, default: 0 },
    totalSold: { type: Number, default: 0 },
    tags: [{ type: String }],
    statusBadge: { type: String }, // e.g. "New", "Premium",
    rating: { type: Number, default: 0, min: 0, max: 5 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
