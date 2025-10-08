import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend if user is logged in
  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart"); // backend returns { items: [...] }
      setCart(data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };
  const navigate = useNavigate();

  const addToCart = async (product, quantity = 1) => {
    try {
      const { data } = await API.post("/cart", {
        productId: product._id,
        quantity,
      });
      setCart(data.items);
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const { data } = await API.delete(`/cart/${id}`);
      setCart(data.items);
    } catch (err) {
      console.error("Failed to remove from cart", err);
    }
  };

const clearCart = async () => {
  try {
    await API.delete("/cart");  // clear backend cart
  } catch (err) {
    console.error("Failed to clear backend cart", err);
  }
  setCart([]);  // clear frontend cart
};

// New helper for logout only
const clearCartFrontend = () => {
  setCart([]); // only clear local state
};


  const increaseQuantity = async (id) => {
    const item = cart.find((i) => i.product._id === id);
    if (item) addToCart(item.product, 1); // reuse addToCart API
  };

  const decreaseQuantity = async (id) => {
    const item = cart.find((i) => i.product._id === id);
    if (item && item.quantity > 1) {
      try {
        // Remove one quantity
        await API.post("/cart", { productId: id, quantity: -1 });
        fetchCart();
      } catch (err) {
        console.error("Failed to decrease quantity", err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        clearCartFrontend,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
