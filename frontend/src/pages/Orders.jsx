

/*

import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  console.log("Orders:", orders); // Debugging line
  if (orders.length === 0)
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center max-w-sm">
        <svg
          className="mx-auto mb-4 w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18"
          />
        </svg>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          No Orders Yet
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          You haven’t placed any orders yet. Start shopping to see your orders here!
        </p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Shop Now
        </button>
      </div>
    </div>
  );


  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o._id} className="border p-4 rounded">
            <p>
              <b>Order ID:</b> {o._id}
            </p>
            <p>
              <b>Status:</b> {o.status}
            </p>
            <p>
              <b>Total:</b> ₹{o.totalPrice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
*/

import React, { useEffect, useState } from "react";
import API from "../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my-orders").then((res) => setOrders(res.data));
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center max-w-sm">
          <svg
            className="mx-auto mb-4 w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h18M3 7h18M3 11h18M3 15h18M3 19h18"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            No Orders Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            You haven’t placed any orders yet. Start shopping to see your orders
            here!
          </p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </div>
    );

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

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-2xl text-center text-gray-900 font-bold mb-6 ">My Orders</h1>
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-[#001F2E] rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Order #{o._id.slice(-6)}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    o.status
                  )}`}
                >
                  {o.status}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {o.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 bg-[#012A3F] rounded-lg p-3"
                  >
                    <img
                      src={
                        item.product?.image || "https://via.placeholder.com/60"
                      }
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product?.name}</h3>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity} × ₹{item.priceAtPurchase}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ₹{item.quantity * item.priceAtPurchase}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center border-t border-gray-700 pt-4 text-sm text-gray-300">
                <div>
                  <p>
                    <b>Total:</b> ₹{o.totalPrice}
                  </p>
                  <p>
                    <b>Payment:</b> {o.paymentMethod}
                  </p>
                  <p>
                    <b>Shipping:</b> {o.shippingAddress?.city},{" "}
                    {o.shippingAddress?.country}
                  </p>
                </div>
                <p>
                  <b>Placed On:</b>{" "}
                  {new Date(o.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
