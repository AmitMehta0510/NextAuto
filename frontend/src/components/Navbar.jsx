import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#001F2E] text-white px-8 py-4 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-cyan-400">
        NextAuto
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center space-x-8 text-lg font-medium">
        <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
        <Link to="/cart" className="hover:text-cyan-400 transition">Cart</Link>
        {user ? (
          <>
            <Link to="/orders" className="hover:text-cyan-400 transition">Orders</Link>
            <Link to="/profile" className="hover:text-cyan-400 transition">Profile</Link>
            {user.role === "admin" && (
              <Link to="/admin/dashboard" className="hover:text-cyan-400 transition">Admin</Link>
            )}
            <button
              onClick={logout}
              className="ml-4 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-cyan-400 transition">Login</Link>
            <Link to="/register" className="hover:text-cyan-400 transition">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Menu (Hamburger) */}
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
