import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../utils/otpApi";
import API from "../utils/api";
import OtpInput from "../components/common/OtpInput";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const identifier = form.email || form.phone;
      if (!identifier) return toast.error("Enter email or phone first");
      const res = await sendOtp(identifier);
      toast.success(res.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const identifier = form.email || form.phone;
      const res = await verifyOtp(identifier, otp);
      toast.success(res.message);
      setVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleRegister = async () => {
    try {
      if (!verified) return toast.error("Please verify OTP first");
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
        <div className="space-y-2 sm:space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-xs sm:text-sm"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-xs sm:text-sm"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone (optional)"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-xs sm:text-sm"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-3 sm:px-4 py-2 sm:py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-xs sm:text-sm"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {!otpSent && (
            <button
              onClick={handleSendOtp}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:opacity-90 transition text-xs sm:text-base"
            >
              Send OTP
            </button>
          )}

          {otpSent && !verified && (
            <div className="mt-3 sm:mt-4 text-center">
              <OtpInput onChange={setOtp} />
              <button
                onClick={handleVerifyOtp}
                className="mt-3 sm:mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-full font-semibold transition text-xs sm:text-base"
              >
                Verify OTP
              </button>
            </div>
          )}

          {verified && (
            <button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:opacity-90 transition mt-3 sm:mt-4 text-xs sm:text-base"
            >
              Register
            </button>
          )}
        </div>

        <p className="text-xs sm:text-sm text-gray-400 mt-5 sm:mt-6 text-center">
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
