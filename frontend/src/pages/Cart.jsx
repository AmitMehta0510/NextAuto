import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext.jsx";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-gray-500 dark:text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty Cart"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty 🛒</h2>
        <p className="mb-6">Looks like you haven’t added anything yet.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-medium shadow-md"
        >
          Shop Now
        </button>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Checkout handler
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-10 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center bg-white dark:bg-[#012A3F] rounded-2xl shadow-md hover:shadow-xl transition p-5"
            >
              {/* Image */}
              <img
                src={item.product?.image || "https://via.placeholder.com/120"}
                alt={item.product?.name}
                className="w-28 h-28 object-cover rounded-lg border"
              />

              {/* Details */}
              <div className="flex-1 ml-5">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.product?.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  ₹{item.product?.price} each
                </p>

                {/* Quantity Controls */}
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
              </div>

              {/* Subtotal & Remove */}
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-800 dark:text-white">
                  ₹{(item.product?.price || 0) * item.quantity}
                </p>
                <button
                  onClick={() => {
                    removeFromCart(item.product._id);
                    toast.error(`${item.product?.name} removed from cart`, {
                      icon: "❌",
                    });
                  }}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-[#001F2E] rounded-2xl shadow-lg p-6 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3 text-gray-700 dark:text-gray-300">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-700 dark:text-gray-300">
            <span>Total Price</span>
            <span className="font-bold text-xl text-blue-600">
              ₹{totalPrice}
            </span>
          </div>

          {/* ✅ Button instead of Link */}
          <button
            onClick={handleCheckout}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-medium shadow-md transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
