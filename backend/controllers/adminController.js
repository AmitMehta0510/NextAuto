import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// Fix: Aggregate totalPrice not total
export const getAdminStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    // aggregate totalPrice instead of "total"
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalPrice" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
    });
  } catch (err) {
    next(err);
  }
};
