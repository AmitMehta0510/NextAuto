import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../src/components/Navbar.jsx"; // ⬅️ import your Navbar
import Footer from "../src/components/Footer.jsx"; // ⬅️ import your Footer

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        <CartProvider>
          <Navbar /> {/* ⬅️ Always render Navbar */}
          <AppRoutes />
          <Footer /> {/* ⬅️ Always render Footer */}
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
