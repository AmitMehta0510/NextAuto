import Order from "../models/Order.js";


export const getSalesReport = async (req, res, next) => {
  try {
    const report = await Order.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          sales: { $sum: "$total" }, // assuming "total" is order total
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    // Map month numbers to names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formatted = report.map((r) => ({
      month: monthNames[r._id.month - 1],
      sales: r.sales,
    }));

    res.json(formatted);
  } catch (err) {
    next(err);
  }
};
