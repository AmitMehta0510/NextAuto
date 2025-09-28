/*
import React, { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import AuthContext from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;
  console.log("Token in Profile:", token); // Debugging line
  const [profile, setProfile] = useState(null);

  if (token) {
    useEffect(() => {
      API.get("/users/profile").then((res) => setProfile(res.data));
    }, []);
  }

  if (!profile) return <p>LogIn to see your profile</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="border p-4 rounded space-y-2">
        hello profile
        <p>
          <b>Name:</b> {profile.name}
        </p>
        <p>
          <b>Email:</b> {profile.email}
        </p>
        <p>
          <b>Role:</b> {profile.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
*/

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import AuthContext from "../context/AuthContext.jsx";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      API.get("/users/profile")
        .then((res) => setProfile(res.data))
        .catch((err) => console.error("Profile fetch error:", err));
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">Log in to see your profile</p>
      </div>
    );
  }

  const getInitial = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#001F2E] text-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-32 flex items-center justify-center relative">
        <div className="absolute -bottom-12">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-cyan-600 text-3xl font-bold shadow-lg border-4 border-[#001F2E]">
            {getInitial(profile.name)}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 mt-14 space-y-4 text-center">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-gray-400">{profile.email}</p>
        <p className="text-gray-400">{profile.phone}</p>
        <span className="px-4 py-1 text-sm rounded-full bg-cyan-500/20 text-cyan-400 font-semibold">
          {profile.role}
        </span>

        {/* Actions */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg font-medium transition"
          >
            My Orders
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium transition"
            onClick={() => navigate("/profile/edit")}>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
