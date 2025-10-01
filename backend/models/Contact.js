import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  applicationType: {
    type: String,
    required: true,
    enum: ["industrial", "agriculture", "residential"],
  },
  message: { type: String, required: true, minlength: 10 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if logged-in user
  ip: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
