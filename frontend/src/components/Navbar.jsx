import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiHome, FiList } from "react-icons/fi";
import AuthContext from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-[#001F2E] text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-cyan-400 hover:text-cyan-300 transition">
        NextAuto
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
        <Link to="/" className="flex items-center gap-1 hover:text-cyan-400 transition">
          <FiHome className="text-xl" /> Home
        </Link>

        <Link to="/cart" className="relative flex items-center gap-1 hover:text-cyan-400 transition">
  <div className="relative">
    <FiShoppingCart className="text-xl" />
    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
        {cartCount}
      </span>
    )}
  </div>
  Cart
</Link>


        {user ? (
          <>
            <Link to="/orders" className="flex items-center gap-1 hover:text-cyan-400 transition">
              <FiList className="text-xl" /> Orders
            </Link>

            <Link to="/profile" className="flex items-center gap-1 hover:text-cyan-400 transition">
              <FiUser className="text-xl" /> Profile
            </Link>

            {user?.isAdmin && (
              <Link to="/admin" className="text-blue-500 hover:text-blue-400 transition font-semibold">
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="ml-2 flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 rounded-lg font-semibold transition"
            >
              <FiLogOut /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
            <Link to="/register" className="hover:text-cyan-400 transition">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-cyan-400 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
