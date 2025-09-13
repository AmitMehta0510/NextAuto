import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getAdminStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
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
