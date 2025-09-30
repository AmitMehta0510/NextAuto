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
      <Toaster position="top-center" reverseOrder={false} />
      <CartProvider>
        <AuthProvider>
          <Navbar /> {/* ⬅️ Always render Navbar */}
          <AppRoutes />
          <Footer /> {/* ⬅️ Always render Footer */}
        </AuthProvider>
      </CartProvider>
    </>
  );
}

export default App;
