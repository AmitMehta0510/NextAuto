import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import API from "../utils/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async () => {
    try {
      if (!identifier || !password)
        return toast.error("Enter email and password");

      const res = await API.post("/auth/login", { identifier, password });
      const { user, token } = res.data;
      const userWithToken = { ...user, token };
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));
      setUser(userWithToken);

      toast.success("Welcome back 🚀");
      fetchCart();
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#020b12] text-white px-2 sm:px-4">
      <div className="bg-[#041421]/90 backdrop-blur-xl shadow-lg rounded-2xl w-full max-w-xs sm:max-w-md p-4 sm:p-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
          Welcome Back to <span className="text-cyan-400">NextAuto</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm text-center mb-4 sm:mb-6">
          Login to continue your journey
        </p>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition text-sm"
          >
            Login
          </button>
        </div>

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
