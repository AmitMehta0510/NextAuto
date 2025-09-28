import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  if (!cart.length) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-gray-500 dark:text-gray-300">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Your cart is empty 🛒</h2>
          <p className="mb-4">Add some products to see them here.</p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-6 text-gray-900 ">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center bg-white dark:bg-[#012A3F] rounded-xl shadow-lg p-5 hover:shadow-xl transition"
            >
              <img
                src={item.product?.image || "https://via.placeholder.com/80"}
                alt={item.product?.name}
                className="w-24 h-24 object-cover rounded-lg border"
              />

              <div className="flex-1 ml-5">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.product?.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  Price: ₹{item.product?.price}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3 mt-3">
                  <button
                    onClick={() => decreaseQuantity(item.product._id)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.product._id)}
                    className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal & Remove */}
              <div className="text-right">
                <p className="font-semibold text-gray-800 dark:text-white">
                  ₹{(item.product?.price || 0) * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-[#001F2E] rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Order Summary
          </h2>
          <div className="flex justify-between mb-3 text-gray-700 dark:text-gray-300">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-700 dark:text-gray-300">
            <span>Total Price</span>
            <span className="font-bold text-lg text-blue-600">
              ₹{totalPrice}
            </span>
          </div>
          <Link
            to="/checkout"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-center font-medium transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
