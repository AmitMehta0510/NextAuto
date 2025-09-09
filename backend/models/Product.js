import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true, default: 0 },
    category: { type: String, default: "other" },
    image: { type: String }, // URL to image (Cloudinary/S3/local)
    stock: { type: Number, default: 0 },
    tags: [{ type: String }],
    statusBadge: { type: String }, // e.g. "New", "Premium"
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
