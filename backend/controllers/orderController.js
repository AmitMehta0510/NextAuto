import Order from "../models/Order.js";
import Product from "../models/Product.js";

// ====================== Customer ======================

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { orderItems, totalPrice, shippingAddress, paymentMethod } = req.body;

    const order = new Order({
      user: req.user._id, // from authMiddleware
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "Confirmed",
    });

    // Save order first
    const savedOrder = await order.save();

    // 🔥 Update stock and sold count for each product
    for (const item of orderItems) {
      const product = await Product.findById(item.product);

      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0); // prevent negative
        product.totalSold = (product.totalSold || 0) + item.quantity;
        await product.save();
      }
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET /api/orders/my-orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("orderItems.product", "name price image images"); // ✅ include image fields
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ====================== Admin ======================

// GET /api/admin/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("orderItems.product", "name price image images"); // ✅ include image fields
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// GET /api/admin/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price image images"); // ✅ include image fields
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// PUT /api/admin/orders/:id
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("user", "name email")
      .populate("orderItems.product", "name price image images"); // ✅ include image fields
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};


// DELETE /api/admin/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};
