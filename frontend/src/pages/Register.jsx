import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/common/Button.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await register(userData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#020b12] text-white px-4">
      <div className="bg-[#041421]/90 shadow-lg rounded-2xl w-full max-w-md p-8 border border-gray-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your <span className="text-cyan-400">NextAuto</span> Account
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Sign up to start your journey
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 bg-red-500/10 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
            required
          />
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
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
