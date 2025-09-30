import Order from "../models/Order.js";

export const getSalesReport = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      {
        $group: {
          // Use createdAt month
          _id: { month: { $month: "$createdAt" } },
          sales: { $sum: "$totalPrice" }, // Fix: sum totalPrice
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Map month numbers to names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // Industry ready: Fill missing months (show months with 0 sales as 0)
    const allMonths = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i],
      sales: 0,
    }));

    report.forEach((r) => {
      allMonths[r._id.month - 1].sales = r.sales;
    });

    res.json(allMonths);
  } catch (err) {
    next(err);
  }
};
