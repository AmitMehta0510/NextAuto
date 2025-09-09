import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

export const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const revenueAgg = await Order.aggregate([{ $group: { _id: null, revenue: { $sum: "$totalPrice" } } }]);
    const totalRevenue = revenueAgg[0]?.revenue || 0;
    res.json({ totalUsers, totalProducts, totalOrders, totalRevenue });
  } catch (err) {
    next(err);
  }
};
