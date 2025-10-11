import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Checkout = () => {
  const {
    cart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shipping form state (added name and phone)
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    if (!cart.length) return setError("🛒 Your cart is empty.");

    if (
      !shipping.name ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.postalCode ||
      !shipping.country
    ) {
      return setError("📦 Please fill in all shipping details.");
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        orderItems: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          priceAtPurchase: item.product.price,
        })),
        totalPrice: cart.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        ),
        shippingAddress: shipping,
        paymentMethod,
      };

      await API.post("/orders", orderData);
      clearCart();
      toast.success("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "❌ Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      {error && (
        <div className="mb-6 bg-red-500 text-white px-4 py-3 rounded-lg shadow">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id || item.product?._id || index}
                className="flex items-center bg-[#001F2E] rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={item.product.image || "https://via.placeholder.com/100"}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-gray-500 font-semibold text-lg">
                    {item.product.name}
                  </h2>
                  <div className="flex items-center space-x-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.product._id)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      –
                    </button>
                    <span className="font-medium text-gray-800 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.product._id)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-cyan-400 font-semibold">
                    ₹{item.product.price} each
                  </p>
                </div>
                <p className="font-bold text-lg">
                  ₹{item.product.price * item.quantity}
                </p>
                <button
                  onClick={() => {
                    removeFromCart(item.product._id);
                    toast.error(`${item.product?.name} removed from cart`, {
                      icon: "❌",
                    });
                  }}
                  className="flex items-center gap-1 text-red-500 text-sm mt-2 hover:underline"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Shipping + Summary */}
        <div className="bg-[#001F2E] rounded-xl p-6 shadow-lg h-fit space-y-6">
          <h2 className="text-xl font-bold border-b border-gray-700 pb-3">
            Shipping Details
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              name="name"
              value={shipping.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="phone"
              value={shipping.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="city"
              value={shipping.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="postalCode"
              value={shipping.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <input
              type="text"
              name="country"
              value={shipping.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold border-b border-gray-700 pb-3 mb-4">
              Payment Method
            </h2>
            <div className="space-y-3">
              {["COD", "UPI", "Card"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border ${
                    paymentMethod === method
                      ? "border-cyan-400 bg-gray-800"
                      : "border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-cyan-400"
                  />
                  <span>{method === "COD" ? "Cash on Delivery" : method}</span>
                </label>
              ))}
            </div>

            {/* Conditional Inputs */}
            {paymentMethod === "UPI" && (
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter your UPI ID (e.g., user@upi)"
                className="mt-4 w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            )}

            {paymentMethod === "Card" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                    className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                    className="w-24 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-bold border-b border-gray-700 pb-3 mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>
                Items ({cart.reduce((sum, i) => sum + i.quantity, 0)})
              </span>
              <span>
                ₹
                {cart.reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                )}
              </span>
            </div>
            <div className="flex justify-between mb-2 text-gray-400">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t border-gray-700 pt-3">
              <span>Total</span>
              <span>
                ₹
                {cart.reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                )}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading || !cart.length}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 px-6 py-3 rounded-xl font-semibold shadow-md transition-all"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
