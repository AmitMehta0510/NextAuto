import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Always attach token if userInfo exists
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    try {
      const parsed = JSON.parse(userInfo);
      const token = parsed.token || parsed?.user?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.error("Failed to parse userInfo", err);
    }
  }
  return config;
});

export default API;
