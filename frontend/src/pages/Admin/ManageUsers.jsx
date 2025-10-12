import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { UserCheck, Trash2 } from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterAdmin, setFilterAdmin] = useState("all");
  const [filterActive, setFilterActive] = useState("all");
  const [sortByDate, setSortByDate] = useState("none");

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleAdmin = async (u) => {
    try {
      if (u.isAdmin) {
        await API.put(`/admin/users/${u._id}/demote`);
      } else {
        await API.put(`/admin/users/${u._id}/promote`);
      }
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Toggle admin failed");
    }
  };

  const handleToggleActive = async (u) => {
    try {
      await API.put(`/admin/users/${u._id}`, { isActive: !u.isActive });
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Toggle active failed");
    }
  };

  const handleDelete = async (id, isAdminFlag) => {
    if (isAdminFlag) {
      alert("Deleting an admin user is not allowed.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const phoneFor = (u) => u.phone || "-";

  const filteredUsers = users
    .filter((u) =>
      u.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .filter((u) => {
      if (filterAdmin === "admin") return u.isAdmin;
      if (filterAdmin === "user") return !u.isAdmin;
      return true;
    })
    .filter((u) => {
      if (filterActive === "active") return u.isActive;
      if (filterActive === "inactive") return !u.isActive;
      return true;
    })
    .sort((a, b) => {
      if (sortByDate === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortByDate === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  return (
    <div className="p-3 sm:p-8 bg-neutral-50 min-h-screen w-full">
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 sm:mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Manage Users
          </h1>
          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Control roles, access, and account status
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm w-full sm:w-auto"
          />
          <select
            value={filterAdmin}
            onChange={(e) => setFilterAdmin(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admins</option>
            <option value="user">Users</option>
          </select>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm"
          >
            <option value="none">Sort by Date</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="min-w-[700px] w-full text-xs sm:text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Email</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Phone</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">isAdmin</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Active</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Joined</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td className="px-2 sm:px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No users found.
                </td>
              </tr>
            )}
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">{u.name}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">{u.email}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">{phoneFor(u)}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {u.isAdmin ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <span className={u.isActive ? "text-green-600" : "text-red-600"}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleToggleAdmin(u)}
                      className="p-1 sm:p-1.5 hover:bg-gray-100 rounded"
                      title={u.isAdmin ? "Demote to User" : "Promote to Admin"}
                    >
                      <UserCheck
                        size={16}
                        className={
                          u.isAdmin
                            ? "text-red-600"
                            : "text-emerald-600 hover:text-emerald-800"
                        }
                      />
                    </button>
                    <button
                      onClick={() => handleToggleActive(u)}
                      className="px-2.5 sm:px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300"
                    >
                      {u.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(u._id, u.isAdmin)}
                      className="p-1 sm:p-1.5 hover:bg-gray-100 rounded"
                      title="Delete User"
                      disabled={u.isAdmin}
                    >
                      <Trash2
                        size={16}
                        className={`${
                          u.isAdmin ? "text-gray-300" : "text-red-600"
                        }`}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUsers;
