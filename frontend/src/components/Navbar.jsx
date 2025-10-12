import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiHome, FiList } from "react-icons/fi";
import NextAuto from "../../public/NextAuto.png";
import AuthContext from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart, clearCartFrontend } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    clearCartFrontend();
    logout();
    setMenuOpen(false); // hide menu on logout
  };

  // Helper for shared nav links
  const navLinks = (
    <>
      <Link to="/" className="flex items-center gap-1 hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>
        <FiHome className="text-xl" /> Home
      </Link>

      <Link to="/cart" className="relative flex items-center gap-1 hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>
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
    </>
  );

  const userLinks = user ? (
    <>
      <Link to="/orders" className="flex items-center gap-1 hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>
        <FiList className="text-xl" /> Orders
      </Link>
      <Link to="/profile" className="flex items-center gap-1 hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>
        <FiUser className="text-xl" /> Profile
      </Link>
      {user?.isAdmin && (
        <Link to="/admin" className="text-blue-500 hover:text-blue-400 transition font-semibold" onClick={() => setMenuOpen(false)}>
          Admin Dashboard
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 bg-cyan-500 hover:bg-cyan-600 px-3 py-1.5 rounded-lg font-semibold transition mt-2 md:mt-0"
      >
        <FiLogOut /> Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>Login</Link>
      <Link to="/register" className="hover:text-cyan-400 transition" onClick={() => setMenuOpen(false)}>Register</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-[#001F2E] text-white px-6 py-3 flex justify-between items-center shadow-lg">
      {/* Logo */}
      
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-cyan-400 hover:text-cyan-300 transition">
        NextAuto
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-6 text-lg font-medium">
        {navLinks}
        {userLinks}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="text-cyan-400 focus:outline-none" onClick={() => setMenuOpen((open) => !open)}>
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

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#001F2E] shadow-lg flex flex-col items-center gap-4 py-5 z-40 md:hidden animate-fade-in">
          {navLinks}
          {userLinks}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
