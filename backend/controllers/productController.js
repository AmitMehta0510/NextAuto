import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

// ====================== Customer ======================

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

// ====================== Admin ======================

// POST /api/admin/products
export const createProduct = async (req, res) => {
  try {
    // Save all fields from req.body (assuming security/middleware/input validation as needed)
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product" });
  }
};


// PUT /api/admin/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};

// DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Remove the deleted product from all carts
    const carts = await Cart.find({ "items.product": product._id });

    for (let cart of carts) {
      // Remove items and calculate quantity removed (for cart count if needed)
      const removedItems = cart.items.filter(
        (item) => item.product.toString() === product._id.toString()
      );
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== product._id.toString()
      );

      await cart.save();
    }

    res.json({ message: "Product deleted and removed from all user carts" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
