import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Button from "../../components/common/Button.jsx";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", isAdmin: false });
  const [editing, setEditing] = useState(null);

  const fetchUsers = () => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/admin/users/${editing}`, form);
    } else {
      await API.post("/admin/users", form);
    }
    setForm({ name: "", email: "", isAdmin: false });
    setEditing(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await API.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isAdmin}
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })}
          />
          Admin
        </label>
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.isAdmin ? "✅ Yes" : "❌ No"}</td>
              <td className="p-2 space-x-2">
                <Button
                  onClick={() => {
                    setForm(u);
                    setEditing(u._id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
