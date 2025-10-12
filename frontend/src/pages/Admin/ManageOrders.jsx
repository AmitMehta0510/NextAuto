import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { CheckCircle, XCircle, Truck, PackageCheck, Eye } from "lucide-react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admin/orders");
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/admin/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="p-3 sm:p-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Manage Orders</h1>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-[600px] w-full text-xs sm:text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3">User</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Items</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Total</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Payment</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Status</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Created</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-2 sm:px-4 py-2 sm:py-3">{o.user?.name || "Guest"}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {o.orderItems
                    .map((i) => `${i.product?.name} x${i.quantity}`)
                    .join(", ")}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">
                  ₹{o.totalPrice.toFixed(2)}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">{o.paymentMethod}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      o.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : o.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : o.status === "Shipped"
                        ? "bg-purple-100 text-purple-800"
                        : o.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 flex gap-2 sm:gap-3">
                  {/* Tooltip container */}
                  <div className="relative group">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      View Details
                    </span>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => updateStatus(o._id, "Confirmed")}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Mark Confirmed
                    </span>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => updateStatus(o._id, "Shipped")}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Truck size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Mark Shipped
                    </span>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => updateStatus(o._id, "Delivered")}
                      className="text-green-600 hover:text-green-800"
                    >
                      <PackageCheck size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Mark Delivered
                    </span>
                  </div>
                  <div className="relative group">
                    <button
                      onClick={() => updateStatus(o._id, "Cancelled")}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XCircle size={16} />
                    </button>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      Cancel Order
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 flex justify-end bg-black bg-opacity-40 z-50">
          <div className="w-full max-w-xs sm:max-w-md bg-white p-4 sm:p-6 shadow-xl overflow-y-auto h-full">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Order Details
            </h2>
            <p className="mb-1 sm:mb-2">
              <span className="font-semibold">User:</span>{" "}
              {selectedOrder.user?.name || "Guest"}
            </p>
            <p className="mb-1 sm:mb-2">
              <span className="font-semibold">Payment:</span>{" "}
              {selectedOrder.paymentMethod}
            </p>
            <p className="mb-1 sm:mb-2">
              <span className="font-semibold">Status:</span>{" "}
              {selectedOrder.status}
            </p>
            <p className="mb-2 sm:mb-4">
              <span className="font-semibold">Total:</span> ₹
              {selectedOrder.totalPrice.toFixed(2)}
            </p>
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Items</h3>
            <ul className="mb-2 sm:mb-4 space-y-1 sm:space-y-2">
              {selectedOrder.orderItems.map((i, idx) => (
                <li key={idx} className="flex justify-between border-b pb-1">
                  <span>
                    {i.product?.name} (₹{i.priceAtPurchase})
                  </span>
                  <span>x{i.quantity}</span>
                </li>
              ))}
            </ul>
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Shipping</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              {[selectedOrder.shippingAddress?.name,
                selectedOrder.shippingAddress?.street,
                selectedOrder.shippingAddress?.apartment,
                selectedOrder.shippingAddress?.city,
                selectedOrder.shippingAddress?.state,
                selectedOrder.shippingAddress?.postalCode,
                selectedOrder.shippingAddress?.country].filter(
                Boolean
              ).join(", ")}
            </p>
            <div className="flex justify-end gap-2 pt-5 sm:pt-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
