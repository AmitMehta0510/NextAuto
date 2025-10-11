import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthContext from "../context/AuthContext.jsx";
import { ShoppingCart, Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const validCart = cart.filter((item) => item.product);

  const totalPrice = validCart.reduce(
    (acc, item) => acc + (item.product.price || 0) * item.quantity,
    0
  );

  const totalItems = validCart.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Checkout handler
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    navigate("/checkout");
  };

  if (!validCart.length) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <ShoppingCart className="mx-auto w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Your Cart is Empty 🛒
          </h2>
          <p className="text-gray-500 dark:text-gray-300 mt-2">
            Looks like you haven’t added anything yet. Start exploring our
            products!
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:opacity-90 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl text-center font-bold mb-10 text-gray-900 dark:text-white">
        Shopping Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {validCart.map((item, index) => (
            <div
              key={item._id || `${item.product?._id}-${index}`} // ✅ unique, safe fallback
              className="flex items-center bg-white dark:bg-[#012A3F] rounded-2xl shadow-md hover:shadow-lg transition p-5"
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
                  ₹{item.product?.price ?? 0} each
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
                  className="flex items-center gap-1 text-red-500 text-sm mt-2 hover:underline"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-[#001F2E] rounded-2xl shadow-lg p-6 h-fit sticky top-20 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3 text-gray-700 dark:text-gray-300">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-6 text-gray-700 dark:text-gray-300">
            <span>Total Price</span>
            <span className="font-bold text-xl text-cyan-600">
              ₹{totalPrice}
            </span>
          </div>

          {/* ✅ Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-lg text-center font-semibold shadow-md hover:opacity-90 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
