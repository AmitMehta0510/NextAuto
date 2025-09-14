import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await login(userData);
      navigate("/"); // after login
    } catch (err) {
      alert("Login failed");
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

        {/* Divider */}
        {/* <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-sm text-gray-400">Or continue with</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div> */}

        {/* Social Logins */}
        {/* <div className="flex justify-center gap-4">
          <button className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition">
            <FaGoogle className="text-white text-lg" />
          </button>
          <button className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition">
            <FaFacebookF className="text-white text-lg" />
          </button>
        </div> */}

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-cyan-400 hover:underline">
            Register Now!
          </a>
        </p>
      </div>
    </section>
  );
};

export default Login;
