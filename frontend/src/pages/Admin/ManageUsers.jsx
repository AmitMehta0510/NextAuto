// import React, { useEffect, useState } from "react";
// import {
//   getAllUsers,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "../../services/userService";
// import Button from "../../components/ui/Button";
// import Modal from "../../components/ui/Modal";

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);

//   const fetchUsers = async () => {
//     const { data } = await getAllUsers();
//     setUsers(data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleSave = async (userData) => {
//     if (editingUser) {
//       await updateUser(editingUser._id, userData);
//     } else {
//       await createUser(userData);
//     }
//     setShowModal(false);
//     fetchUsers();
//   };

//   const handleDelete = async (id) => {
//     await deleteUser(id);
//     fetchUsers();
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Manage Users</h2>
//         <Button onClick={() => setShowModal(true)}>+ Add User</Button>
//       </div>

//       <table className="w-full border-collapse border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Role</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u._id} className="text-center">
//               <td className="border p-2">{u.name}</td>
//               <td className="border p-2">{u.email}</td>
//               <td className="border p-2">{u.role}</td>
//               <td className="border p-2 flex gap-2 justify-center">
//                 <Button
//                   variant="secondary"
//                   onClick={() => {
//                     setEditingUser(u);
//                     setShowModal(true);
//                   }}
//                 >
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(u._id)}>
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal
//         isOpen={showModal}
//         onClose={() => {
//           setShowModal(false);
//           setEditingUser(null);
//         }}
//         title={editingUser ? "Edit User" : "Add User"}
//       >
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const formData = {
//               name: e.target.name.value,
//               email: e.target.email.value,
//               role: e.target.role.value,
//             };
//             handleSave(formData);
//           }}
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             defaultValue={editingUser?.name}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             defaultValue={editingUser?.email}
//             className="border p-2 w-full mb-2"
//             required
//           />
//           <select
//             name="role"
//             defaultValue={editingUser?.role || "user"}
//             className="border p-2 w-full mb-2"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           <Button type="submit" className="w-full">
//             Save
//           </Button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Button from "../../components/common/Button.jsx";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [editing, setEditing] = useState(null);

  const fetchUsers = () => {
    API.get("/admin/users").then((res) => setUsers(res.data));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await API.put(`/admin/users/${editing}`, form);
    } else {
      await API.post("/admin/users", form);
    }
    setForm({ name: "", email: "", role: "user" });
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
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => { setForm(u); setEditing(u._id); }}>Edit</Button>
                <Button onClick={() => handleDelete(u._id)} className="bg-red-500">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
