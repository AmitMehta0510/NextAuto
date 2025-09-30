import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { ShoppingBag, Package, CreditCard, MapPin } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <ShoppingBag className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            No Orders Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            You haven’t placed any orders yet. Start shopping to see them here!
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 max-w-5xl mx-auto w-full p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Orders
        </h1>

        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-cyan-600" />
                  Order #{o._id.slice(-6)}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {o.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50"
                  >
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/60"
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {item.product?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × ₹{item.priceAtPurchase}
                      </p>
                    </div>
                    <div className="font-semibold text-gray-800">
                      ₹{item.quantity * item.priceAtPurchase}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row justify-between md:items-center gap-4 text-sm text-gray-700 rounded-b-2xl">
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-500" />
                    <b>Payment:</b> {o.paymentMethod}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <b>Shipping:</b> {o.shippingAddress?.city},{" "}
                    {o.shippingAddress?.country}
                  </p>
                  <p>
                    <b>Total:</b> ₹{o.totalPrice}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">
                    <b>Placed On:</b>{" "}
                    {new Date(o.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-white border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} NextAuto. All rights reserved.
      </footer>
    </div>
  );
};

export default Orders;
