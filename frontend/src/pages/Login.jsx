import React, { useState, useContext } from "react";
import toast from "react-hot-toast";
import { sendOtp, verifyOtp } from "../utils/otpApi";
import API from "../utils/api";
import OtpInput from "../components/common/OtpInput";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [method, setMethod] = useState("password");
  const { setUser } = useContext(AuthContext);
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleSendOtp = async () => {
    try {
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
      const res = await verifyOtp(identifier, otp);
      toast.success(res.message);
      setVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleLogin = async () => {
    try {
      let res;
      if (method === "password") {
        if (!identifier || !password) return toast.error("Enter credentials");
        res = await API.post("/auth/login", { identifier, password });
      } else {
        if (!verified) return toast.error("Verify OTP first");
        res = await API.post("/auth/login", { identifier, otp });
      }

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
    <section className="flex items-center justify-center min-h-screen bg-[#020b12] text-white px-4">
      <div className="bg-[#041421]/90 backdrop-blur-xl shadow-lg rounded-2xl w-full max-w-md p-8 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-4">
          Welcome Back to <span className="text-cyan-400">NextAuto</span>
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Login to continue your journey
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setMethod("password")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              method === "password"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Password Login
          </button>
          <button
            onClick={() => setMethod("otp")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              method === "otp"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            OTP Login
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Email or Phone"
            className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
            onChange={(e) => setIdentifier(e.target.value)}
          />

          {method === "password" && (
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {method === "otp" && (
            <>
              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
                >
                  Send OTP
                </button>
              )}
              {otpSent && !verified && (
                <div className="mt-4 text-center">
                  <OtpInput onChange={setOtp} />
                  <button
                    onClick={handleVerifyOtp}
                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </>
          )}

          {(method === "password" || verified) && (
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition mt-4"
            >
              Login
            </button>
          )}
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
