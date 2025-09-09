import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" });

    const orderItems = cart.items.map(i => ({
      product: i.product._id,
      quantity: i.quantity,
      priceAtPurchase: i.product.price
    }));

    const totalPrice = orderItems.reduce((s, i) => s + i.priceAtPurchase * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || "COD"
    });

    // clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("user", "name email").populate("orderItems.product");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const { status } = req.body;
    if (status) order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};
