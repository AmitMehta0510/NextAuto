import api from "./api";

// user side
export const placeOrder = (orderData) => api.post("/orders", orderData);
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);

// admin side
export const getAllOrders = () => api.get("/admin/orders");
export const updateOrderStatus = (id, status) =>
  api.put(`/admin/orders/${id}`, { status });
