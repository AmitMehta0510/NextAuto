import api from "./api";

export const getCart = () => api.get("/cart");
export const addToCart = (productId, qty = 1) =>
  api.post("/cart", { productId, qty });
export const updateCartItem = (itemId, qty) =>
  api.put(`/cart/${itemId}`, { qty });
export const removeCartItem = (itemId) => api.delete(`/cart/${itemId}`);
export const clearCart = () => api.delete("/cart/clear");
