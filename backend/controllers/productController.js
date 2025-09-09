import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const payload = { ...req.body, createdBy: req.user._id };
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    Object.assign(p, req.body);
    await p.save();
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    await p.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
