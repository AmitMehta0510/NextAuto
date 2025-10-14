import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Always include id, role, and isAdmin in the payload
const signToken = (id, role, isAdmin) =>
  jwt.sign({ id, role, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// REGISTER
export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !password || (!email && !phone))
      return res.status(400).json({ message: "Missing fields" });

    // ✅ Build dynamic query to prevent empty fields from causing false matches
    const query = [];
    if (email && email.trim() !== "") query.push({ email });
    if (phone && phone.trim() !== "") query.push({ phone });

    if (query.length === 0)
      return res.status(400).json({ message: "Provide valid email or phone" });

    const exists = await User.findOne({ $or: query });
    if (exists)
      return res.status(400).json({ message: "Email or phone already in use" });

    const user = await User.create({
      name,
      email: email?.trim() || undefined,
      phone: phone?.trim() || undefined,
      password,
    });

    const token = signToken(user._id, user.role, user.isAdmin);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier)
      return res.status(400).json({ message: "Missing identifier" });

    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    }).select("+password");

    if (!user) return res.status(400).json({ message: "User not found" });

    // ✅ Password Login
    if (!password)
      return res.status(400).json({ message: "Password is required" });

    const validPassword = await user.matchPassword(password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id, user.role, user.isAdmin);

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
