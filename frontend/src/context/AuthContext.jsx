import { createContext, useState, useEffect, useContext } from "react";
import API from "../utils/api";
import { useCart } from "./CartContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { fetchCart, clearCart } = useCart();

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchCart(); // fetch cart on app reload if user is logged in
    }
  }, []);

  const login = async (userData) => {
    const { data } = await API.post("/users/login", userData);
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    fetchCart(); // fetch user's cart after login
  };

  const register = async (userData) => {
    const { data } = await API.post("/users/register", userData);
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    fetchCart(); // fetch cart after registration
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    clearCart(); // reset frontend cart, backend stays intact
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
