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
  const roleBadge =
    profile.isAdmin ? (
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
    <div className="max-w-2xl mx-auto mt-12 mb-16 shadow-xl rounded-3xl bg-white overflow-hidden animate-fadein">
      {/* Header gradient */}
      <div className="bg-gradient-to-br from-cyan-500 to-blue-600 h-40 relative flex items-end">
        <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 shadow-lg">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-cyan-100 flex items-center justify-center text-cyan-600 text-5xl font-extrabold">
            {getInitial(profile.name)}
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="pt-16 pb-8 px-8 text-center bg-white">
        <h1 className="text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
          {profile.name}
          {roleBadge}
        </h1>
        <div className="flex justify-center items-center gap-2 mt-4">
          {statusBadge}
        </div>

        <div className="mt-6 flex flex-col gap-4 items-center text-gray-700">
          <div className="flex items-center gap-2">
            <FiMail className="text-cyan-500" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="text-emerald-500" />
            <span>{profile.phone ? profile.phone : <span className="text-gray-400">Not Provided</span>}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCalendar className="text-blue-400" />
            <span>
              Joined{" "}
              <span className="font-semibold text-gray-900">{formattedDate}</span>
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate("/orders")}
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
            aria-label="View My Orders"
          >
            <PiUserFill size={18} /> My Orders
          </button>
          <button
            onClick={() => navigate("/profile/edit")}
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
            aria-label="Edit Profile"
          >
            <FiEdit2 size={18} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
