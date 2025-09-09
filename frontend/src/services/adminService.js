import api from "../utils/api";

// Products
export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Orders
export const getOrders = () => api.get("/orders");
export const updateOrderStatus = (id, status) =>
  api.put(`/orders/${id}`, { status });

// Users
export const getUsers = () => api.get("/users");
export const updateUserRole = (id, role) =>
  api.put(`/users/${id}`, { role });
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Reports
export const getSalesReport = () => api.get("/reports/sales");
