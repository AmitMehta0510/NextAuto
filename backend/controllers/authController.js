import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id, isAdmin) =>
  jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  console.log(">>>[in signup] process.env.JWT_SECRET ", process.env.JWT_SECRET)

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, phone, password });
    // const token = signToken(user._id, user.role);
    const token = signToken(user._id, user.isAdmin);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isAdmin: user.isAdmin },
      token
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await user.matchPassword(password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    // const token = signToken(user._id, user.role);
    const token = signToken(user._id, user.isAdmin);
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, isAdmin: user.isAdmin },
      token
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    // console.log("USER: ", req.user);
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({success: false, message: "Server error" });
  }
};