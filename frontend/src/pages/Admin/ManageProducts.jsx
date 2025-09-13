import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import Button from "../../components/common/Button.jsx";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [editing, setEditing] = useState(null);

const fetchProducts = () => {
  API.get("/api/admin/products").then((res) => setProducts(res.data));
};

  useEffect(() => { fetchProducts(); }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (editing) {
    await API.put(`/api/admin/products/${editing}`, form);
  } else {
    await API.post("/api/admin/products", form);
  }
  setForm({ name: "", price: "", image: "" });
  setEditing(null);
  fetchProducts();
};

const handleDelete = async (id) => {
  await API.delete(`/api/admin/products/${id}`);
  fetchProducts();
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border px-3 py-2 rounded"
        />
        <Button type="submit">{editing ? "Update" : "Add"}</Button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">${p.price}</td>
              <td className="p-2 space-x-2">
                <Button onClick={() => { setForm(p); setEditing(p._id); }}>Edit</Button>
                <Button onClick={() => handleDelete(p._id)} className="bg-red-500">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
