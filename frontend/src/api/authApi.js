import api from "./axios";

export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/auth/login", userData);
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");
  return data;
};
