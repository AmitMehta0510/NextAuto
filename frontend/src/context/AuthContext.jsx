import React, { createContext, useEffect, useState, useContext } from "react";
import { login, register, getProfile, logout } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getProfile();
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    if (localStorage.getItem("token")) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const { data } = await login(credentials);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const handleRegister = async (userData) => {
    const { data } = await register(userData);
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add this helper hook
// export const useAuth = () => useContext(AuthContext);

export default AuthContext;
