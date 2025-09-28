import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/components/Navbar.jsx"; // ⬅️ import your Navbar

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <CartProvider>
          <Navbar /> {/* ⬅️ Always render Navbar */}
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
