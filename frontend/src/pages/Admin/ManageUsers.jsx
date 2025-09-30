import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import {
  UserPlus,
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  UserCheck,
} from "lucide-react";

// Modern switch component
const Switch = ({ checked, onChange }) => (
  <button
    type="button"
    className={`inline-flex h-6 w-11 items-center rounded-full transition-colors px-0.5
      ${checked ? "bg-emerald-500" : "bg-gray-300"}
    `}
    role="switch"
    aria-checked={checked}
    tabIndex={0}
    onClick={() => onChange(!checked)}
  >
    <span
      className={`inline-block h-5 w-5 transform bg-white rounded-full shadow ring-1 ring-inset ring-gray-300 transition
        ${checked ? "translate-x-5" : "translate-x-0"}
      `}
    />
  </button>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    isAdmin: false,
    isActive: true,
    password: "",
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/admin/users");
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddUser = () => {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "user",
      isAdmin: false,
      isActive: true,
      password: "",
    });
    setShowForm(true);
  };

  const openEditUser = (u) => {
    setEditing(u._id);
    setForm({
      name: u.name || "",
      email: u.email || "",
      phone: u.phone || u.phoneNumber || u.contact || u.phoneNo || "",
      role: u.role || "user",
      isAdmin: !!u.isAdmin,
      isActive: typeof u.isActive === "boolean" ? u.isActive : true,
      password: "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // build payload - only fields we want to send
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      isAdmin: form.isAdmin,
      isActive: form.isActive,
    };
    if (form.password) payload.password = form.password;

    try {
      if (editing) {
        await API.put(`/admin/users/${editing}`, payload);
      } else {
        try {
          await API.post("/admin/users", payload);
        } catch (err) {
          if (err?.response?.status === 404 || err?.response?.status === 400) {
            if (!payload.password) {
              await API.post("/users/register", {
                name: payload.name,
                email: payload.email,
                password: form.password || "Welcome@123",
                phone: payload.phone,
              });
            } else {
              await API.post("/users/register", {
                name: payload.name,
                email: payload.email,
                password: payload.password,
                phone: payload.phone,
              });
            }
            if (payload.isAdmin) {
              await fetchUsers();
              const created = users.find((u) => u.email === payload.email);
              if (created && created._id) {
                try {
                  await API.put(`/admin/users/${created._id}/promote`);
                } catch {}
              }
            }
          } else {
            throw err;
          }
        }
      }
      setShowForm(false);
      setEditing(null);
      setForm({
        name: "",
        email: "",
        phone: "",
        role: "user",
        isAdmin: false,
        isActive: true,
        password: "",
      });
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Save user failed");
    } finally {
      setLoading(false);
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

  const handleToggleActive = async (u) => {
    try {
      await API.put(`/admin/users/${u._id}`, { isActive: !u.isActive });
      setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, isActive: !x.isActive } : x)));
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Toggle active failed");
    }
  };

  const handlePromote = async (u) => {
    try {
      await API.put(`/admin/users/${u._id}/promote`);
      await fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Promote failed");
    }
  };

  const phoneFor = (u) => u.phone || u.phoneNumber || u.contact || u.phoneNo || "-";

  return (
    <div className="p-8 bg-neutral-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Manage Users</h1>
          <p className="mt-1 text-gray-500">Create, edit, and manage platform users</p>
        </div>
        <button
          onClick={openAddUser}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-semibold text-white px-5 py-2.5 rounded-lg shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Phone</th>
              <th className="px-4 py-3 text-left font-medium">Role</th>
              <th className="px-4 py-3 text-left font-medium">Admin</th>
              <th className="px-4 py-3 text-left font-medium">Active</th>
              <th className="px-4 py-3 text-left font-medium">Created</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                  No users found.
                </td>
              </tr>
            )}

            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{phoneFor(u)}</td>
                <td className="px-4 py-3 capitalize">{u.role || "user"}</td>
                <td className="px-4 py-3">{u.isAdmin ? <span className="text-green-600">Yes</span> : <span className="text-gray-400">No</span>}</td>
                <td className="px-4 py-3">
                  <span className={u.isActive ? "text-green-600" : "text-red-600"}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {/* Edit */}
                    <div className="relative">
                      <button
                        onClick={() => openEditUser(u)}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title="Edit"
                      >
                        <Pencil size={18} className="text-sky-600 group-hover:text-sky-800" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
                          Edit User
                        </span>
                      </button>
                    </div>
                    {/* Promote to admin */}
                    <div className="relative">
                      <button
                        onClick={() => handlePromote(u)}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title="Promote"
                      >
                        <UserCheck size={18} className="text-emerald-600 group-hover:text-emerald-800" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
                          Promote to Admin
                        </span>
                      </button>
                    </div>
                    {/* Toggle active */}
                    <div className="relative">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title={u.isActive ? "Deactivate user" : "Activate user"}
                      >
                        {u.isActive ? (
                          <ToggleRight size={20} className="text-gray-700 group-hover:text-black" />
                        ) : (
                          <ToggleLeft size={20} className="text-gray-400 group-hover:text-black" />
                        )}
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
                          {u.isActive ? "Deactivate" : "Activate"}
                        </span>
                      </button>
                    </div>
                    {/* Delete */}
                    <div className="relative">
                      <button
                        onClick={() => handleDelete(u._id, u.isAdmin)}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title="Delete"
                        disabled={u.isAdmin}
                      >
                        <Trash2 size={18} className={`group-hover:text-red-800 ${u.isAdmin ? "text-gray-300" : "text-red-600"}`} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer form for add/edit */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
          <div className="ml-auto w-full sm:w-[420px] bg-white p-8 overflow-auto shadow-2xl rounded-l-xl relative animate-slideInRight">
            <h3 className="text-xl font-bold mb-4">{editing ? "Edit User" : "Add User"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  required
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <input
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone (include country code)"
                  value={form.phone}
                  onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                />
              </div>
              <div className="flex gap-3 items-center mt-2">
                <div className="flex-1">
                  <label className="text-sm font-medium">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex flex-col items-center gap-1 w-[74px]">
                  <span className="text-xs font-medium text-gray-600">Admin?</span>
                  <Switch checked={form.isAdmin} onChange={(val) => setForm((s) => ({ ...s, isAdmin: val }))} />
                </div>
                <div className="flex flex-col items-center gap-1 w-[74px]">
                  <span className="text-xs font-medium text-gray-600">Active</span>
                  <Switch checked={form.isActive} onChange={(val) => setForm((s) => ({ ...s, isActive: val }))} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {editing ? "Password (leave blank to keep current)" : "Password"}
                </label>
                <input
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={editing ? "••••••••" : "Password"}
                  value={form.password}
                  onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                  type="password"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                >
                  {loading ? "Saving..." : editing ? "Update user" : "Create user"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
