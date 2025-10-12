import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Checkout = () => {
  const getImageUrl = (product) => {
    if (!product) return "https://via.placeholder.com/100";
    const image =
      product.images?.[0] || product.image || "https://via.placeholder.com/100";
    return image.startsWith("http")
      ? image
      : `${import.meta.env.VITE_API_URL}/${image}`;
  };

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

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handleChange = (e) =>
    setShipping({ ...shipping, [e.target.name]: e.target.value });

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
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Unavailable",
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

  const handlePaymentSelect = (method) => {
    if (method === "UPI" || method === "Card") {
      toast.error("⚠️ Payment via UPI or Card is currently not available.");
      return;
    }
    setPaymentMethod(method);
  };

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
        Checkout
      </h1>

      {error && (
        <div className="mb-6 bg-red-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow text-sm sm:text-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-3 sm:space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={item._id || item.product?._id || index}
                className="flex flex-col sm:flex-row items-center bg-[#001F2E] rounded-xl p-3 sm:p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={getImageUrl(item.product)}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/100")
                  }
                />
                <div className="sm:ml-4 mt-2 sm:mt-0 flex-1 w-full text-center sm:text-left">
                  <h2 className="text-gray-400 font-semibold text-base sm:text-lg">
                    {item.product.name}
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 mt-2 sm:mt-3">
                    <button
                      onClick={() => decreaseQuantity(item.product._id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      –
                    </button>
                    <span className="font-medium text-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.product._id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-cyan-400 font-semibold text-sm sm:text-base">
                    ₹{item.product.price} each
                  </p>
                </div>
                <div className="flex flex-col items-center sm:items-end mt-3 sm:mt-0">
                  <p className="font-bold text-base sm:text-lg">
                    ₹{item.product.price * item.quantity}
                  </p>
                  <button
                    onClick={() => {
                      removeFromCart(item.product._id);
                      toast.error(`${item.product?.name} removed from cart`, {
                        icon: "❌",
                      });
                    }}
                    className="flex items-center gap-1 text-red-500 text-xs sm:text-sm mt-2 hover:underline"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Shipping + Summary */}
        <div className="bg-[#001F2E] rounded-xl p-4 sm:p-6 shadow-lg h-fit space-y-5 sm:space-y-6 mt-4 md:mt-0">
          {/* Shipping Details */}
          <h2 className="text-lg sm:text-xl font-bold border-b border-gray-700 pb-2 sm:pb-3">
            Shipping Details
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {["name", "phone", "address", "city", "postalCode", "country"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={shipping[field]}
                  onChange={handleChange}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
                />
              )
            )}
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold border-b border-gray-700 pb-2 sm:pb-3 mb-3 sm:mb-4">
              Payment Method
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {["COD", "UPI", "Card"].map((method) => (
                <label
                  key={method}
                  className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg cursor-pointer border ${
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
                    onChange={() => handlePaymentSelect(method)}
                    className="accent-cyan-400"
                  />
                  <span className="text-sm sm:text-base">{method === "COD" ? "Cash on Delivery" : method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold border-b border-gray-700 pb-2 sm:pb-3 mb-3 sm:mb-4">
              Order Summary
            </h2>
            <div className="flex justify-between mb-1 sm:mb-2 text-sm sm:text-base">
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
            <div className="flex justify-between mb-1 sm:mb-2 text-gray-400 text-sm sm:text-base">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-base sm:text-lg mt-2 sm:mt-4 border-t border-gray-700 pt-2 sm:pt-3">
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
            className="mt-2 sm:mt-4 w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold shadow-md transition-all text-sm sm:text-base"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
