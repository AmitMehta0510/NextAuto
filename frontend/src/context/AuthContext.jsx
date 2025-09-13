import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await API.post("/users/login", { email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const register = async (name, email, password) => {
    const { data } = await API.post("/users/register", { name, email, password });
    setUser(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
