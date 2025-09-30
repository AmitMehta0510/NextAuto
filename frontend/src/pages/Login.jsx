import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  // Get redirect path from state (default: home "/")
  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await login(userData);
      navigate(from, { replace: true }); // ✅ redirect back to intended page
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#020b12] text-white px-4">
      <div className="bg-[#041421]/90 shadow-lg rounded-2xl w-full max-w-md p-8 border border-gray-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back to <span className="text-cyan-400">NextAuto</span>
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Login to continue your journey
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 bg-red-500/10 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register Now!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
