// frontend/src/pages/Profile.jsx

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import AuthContext from "../context/AuthContext.jsx";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiEdit2,
  FiUser,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { PiUserFill } from "react-icons/pi";

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

  // Format registration date
  const formattedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";

  // Role UI element
  const roleBadge = profile.isAdmin ? (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold tracking-wide uppercase">
      <FiUserCheck className="inline" /> Admin
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase">
      <FiUser className="inline" /> User
    </span>
  );

  // Active status badge
  const statusBadge = profile.isActive ? (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-600 text-xs font-bold">
      <FiUserCheck className="inline" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
      <FiUserX className="inline" /> Inactive
    </span>
  );

  return (
    <div className="max-w-lg mx-auto mt-16 mb-16 shadow-2xl rounded-3xl overflow-hidden border border-cyan-900/40 bg-[#071E2F] animate-fadein">

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-8 py-8 bg-gradient-to-r from-cyan-600/90 to-emerald-600/90">
        <div className="w-24 h-24 rounded-full bg-white border-4 border-cyan-400 flex items-center justify-center text-cyan-700 text-5xl font-extrabold shadow-xl -mt-5 md:mt-0">
          {getInitial(profile.name)}
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start">
          <div className="flex flex-row gap-3 items-center mb-2">
            <span className="text-2xl font-bold text-gray-100">{profile.name}</span>
            {roleBadge}
          </div>
          <div>{statusBadge}</div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="bg-[#001F2E] px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FiMail className="text-cyan-400" />
              <span className="text-gray-200">{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-emerald-400" />
              <span className="text-white font-semibold">
                {profile.phone ? (
                  profile.phone
                ) : (
                  <span className="text-gray-500 italic">Not Provided</span>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-blue-400" />
              <span className="text-white font-semibold">
                Joined{" "}
                <span className="font-semibold text-gray-100">
                  {formattedDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-8 py-8 bg-[#001828] border-t border-cyan-900/20">
        <button
          onClick={() => navigate("/orders")}
          className="flex-grow inline-flex items-center gap-2 px-6 py-3 ml-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-white font-semibold shadow-md transition"
          aria-label="View My Orders"
        >
          <PiUserFill size={18} /> My Orders
        </button>
        <button
          onClick={() => navigate("/profile/edit")}
          className="flex-grow inline-flex items-center gap-2 px-6 py-3 mr-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold shadow-md transition"
          aria-label="Edit Profile"
        >
          <FiEdit2 size={18} /> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
