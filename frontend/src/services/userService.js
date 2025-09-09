import api from "./api";

// auth + user
export const getProfile = () => api.get("/users/me");
export const updateProfile = (userData) => api.put("/users/me", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);
export const registerUser = (userData) => api.post("/auth/register", userData);

// admin side
export const getAllUsers = () => api.get("/admin/users");
export const createUser = (userData) => api.post("/admin/users", userData);
export const updateUser = (id, userData) =>
  api.put(`/admin/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);
