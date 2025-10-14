import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import API from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!form.name || !form.email || !form.password)
        return toast.error("Please fill all required fields");

      const { data } = await API.post("/auth/register", form);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(data.user);
      toast.success("Registered successfully 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#020b12] text-white px-2 sm:px-4">
      <div className="bg-[#041421]/90 backdrop-blur-xl shadow-lg rounded-2xl w-full max-w-xs sm:max-w-md p-4 sm:p-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
          Create Your <span className="text-cyan-400">NextAuto</span> Account
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm text-center mb-4 sm:mb-6">
          Join us and explore your next journey 🚀
        </p>

        <div className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone (optional)"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-sm"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition text-sm"
          >
            Register
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
