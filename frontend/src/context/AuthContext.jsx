import React, { createContext, useState, useEffect } from "react";
import API from "../utils/api";
import { useCart } from "./CartContext";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { fetchCart, clearCartFrontend } = useCart();
  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchCart();
    }
  }, []);

  // ✅ Login
  const login = async (credentials) => {
    try {
      const { data } = await API.post("/auth/login", credentials);
      const userWithToken = { ...data.user, token: data.token };
      setUser(userWithToken);
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));
      toast.success("Login successful");
      fetchCart();
      return data;
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ Register
  const register = async (formData) => {
    try {
      const { data } = await API.post("/auth/register", formData);

      const userWithToken = { ...data.user, token: data.token };
      setUser(userWithToken);
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));
      toast.success("Registration successful");
      fetchCart();
      return data;
    } catch (err) {
      console.error("Register error:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    clearCartFrontend();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
