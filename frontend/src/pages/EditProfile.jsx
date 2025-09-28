import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import AuthContext from "../context/AuthContext.jsx";

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      API.get("/users/profile")
        .then((res) => {
          setFormData({
            name: res.data.name,
            email: res.data.email,
            phone: res.data.phone || "",
            password: "",
          });
        })
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/users/profile", formData);
      localStorage.setItem("userInfo", JSON.stringify({ ...user, ...data }));
      setUser({ ...user, ...data });
      navigate("/profile");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-[#001F2E] text-white rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password (optional)</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg font-semibold transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
