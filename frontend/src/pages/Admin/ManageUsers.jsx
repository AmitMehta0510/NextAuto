// import React, { useEffect, useState } from "react";
// import API from "../../utils/api";
// import Button from "../../components/common/Button.jsx";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", isAdmin: false });
//   const [editing, setEditing] = useState(null);

//   const fetchUsers = () => {
//     API.get("/admin/users").then((res) => setUsers(res.data));
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editing) {
//       await API.put(`/admin/users/${editing}`, form);
//     } else {
//       await API.post("/admin/users", form);
//     }
//     setForm({ name: "", email: "", isAdmin: false });
//     setEditing(null);
//     fetchUsers();
//   };

//   const handleDelete = async (id) => {
//     await API.delete(`/admin/users/${id}`);
//     fetchUsers();
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           className="border px-3 py-2 rounded"
//         />
//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//           className="border px-3 py-2 rounded"
//         />
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={form.isAdmin}
//             onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
//           />
//           Admin
//         </label>
//         <Button type="submit">{editing ? "Update" : "Add"}</Button>
//       </form>

//       {/* Table */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2">Name</th>
//             <th className="p-2">Email</th>
//             <th className="p-2">Admin</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id} className="border-t">
//               <td className="p-2">{u.name}</td>
//               <td className="p-2">{u.email}</td>
//               <td className="p-2">{u.isAdmin ? "✅ Yes" : "❌ No"}</td>
//               <td className="p-2 space-x-2">
//                 <Button
//                   onClick={() => {
//                     setForm(u);
//                     setEditing(u._id);
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(u._id)}
//                   className="bg-red-500"
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ManageUsers;
// frontend/src/pages/Admin/ManageUsers.jsx
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
      console.error("Error fetching users:", err);
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
      password: "", // optional on edit
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
        // Update existing user
        await API.put(`/admin/users/${editing}`, payload);
      } else {
        // Create new user (try admin create first; many backends expose /admin/users)
        try {
          await API.post("/admin/users", payload);
        } catch (err) {
          // fallback to public register if admin endpoint not available
          // public register often requires { name, email, password }
          if (err?.response?.status === 404 || err?.response?.status === 400) {
            if (!payload.password) {
              // public register requires password
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
            // if admin intended to make user admin, try promote endpoint (best-effort)
            if (payload.isAdmin) {
              // try to find created user id by fetching users
              await fetchUsers();
              const created = users.find((u) => u.email === payload.email);
              if (created && created._id) {
                try {
                  await API.put(`/admin/users/${created._id}/promote`);
                } catch (promErr) {
                  console.warn("Failed to promote created user (fallback):", promErr);
                }
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
      console.error("Save user failed:", err);
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
      console.error("Error deleting user:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleToggleActive = async (u) => {
    try {
      await API.put(`/admin/users/${u._id}`, { isActive: !u.isActive });
      // optimistic UI: update local state quickly (optional)
      setUsers((prev) => prev.map((x) => (x._id === u._id ? { ...x, isActive: !x.isActive } : x)));
      // ensure fresh
      await fetchUsers();
    } catch (err) {
      console.error("Toggle active failed:", err);
      alert(err.response?.data?.message || "Toggle active failed");
    }
  };

  const handlePromote = async (u) => {
    try {
      await API.put(`/admin/users/${u._id}/promote`);
      await fetchUsers();
    } catch (err) {
      console.error("Promote failed:", err);
      alert(err.response?.data?.message || "Promote failed");
    }
  };

  // helper to render phone with fallbacks
  const phoneFor = (u) => u.phone || u.phoneNumber || u.contact || u.phoneNo || "-";

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <p className="text-sm text-gray-400 mt-1">Create, edit and manage users</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddUser}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <UserPlus size={16} />
            Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Admin</th>
              <th className="px-4 py-3 text-left">Active</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{phoneFor(u)}</td>
                <td className="px-4 py-3 capitalize">{u.role || "user"}</td>
                <td className="px-4 py-3">{u.isAdmin ? "✅ Yes" : "❌ No"}</td>
                <td className="px-4 py-3">
                  <span className={u.isActive ? "text-green-600" : "text-red-600"}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {/* Edit */}
                    <div className="relative group">
                      <button
                        onClick={() => openEditUser(u)}
                        className="p-1 text-sky-600 hover:text-sky-800 rounded"
                        title="Edit user"
                      >
                        <Pencil size={16} />
                      </button>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                        Edit
                      </div>
                    </div>

                    {/* Promote to admin */}
                    <div className="relative group">
                      <button
                        onClick={() => handlePromote(u)}
                        className="p-1 text-emerald-600 hover:text-emerald-800 rounded"
                        title="Promote to admin"
                      >
                        <UserCheck size={16} />
                      </button>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                        Promote to Admin
                      </div>
                    </div>

                    {/* Toggle active */}
                    <div className="relative group">
                      <button
                        onClick={() => handleToggleActive(u)}
                        className="p-1 text-gray-700 hover:text-black rounded"
                        title={u.isActive ? "Deactivate" : "Activate"}
                      >
                        {u.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                      </button>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                        {u.isActive ? "Deactivate" : "Activate"}
                      </div>
                    </div>

                    {/* Delete */}
                    <div className="relative group">
                      <button
                        onClick={() => handleDelete(u._id, u.isAdmin)}
                        className="p-1 text-red-600 hover:text-red-800 rounded"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                        Delete
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer form for add/edit */}
      {showForm && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
          <div className="ml-auto w-full sm:w-[420px] bg-white p-6 overflow-auto shadow-xl relative">
            <h3 className="text-xl font-semibold mb-3">{editing ? "Edit User" : "Add User"}</h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              />
              <input
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Phone (include country code if any)"
                value={form.phone}
                onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              />
              <div className="flex gap-2">
                <select
                  value={form.role}
                  onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
                  className="flex-1 border px-3 py-2 rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.isAdmin}
                    onChange={(e) => setForm((s) => ({ ...s, isAdmin: e.target.checked }))}
                  />
                  Admin
                </label>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((s) => ({ ...s, isActive: e.target.checked }))}
                />
                Active
              </label>

              <input
                className="w-full border px-3 py-2 rounded"
                placeholder={editing ? "Password (leave blank to keep current)" : "Password"}
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                type="password"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button disabled={loading} type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
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
