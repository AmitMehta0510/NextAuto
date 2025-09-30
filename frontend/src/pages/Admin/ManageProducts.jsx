import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Electronics",
  "Fashion",
  "Home",
  "Toys",
  "Books",
  "Other",
];

const badgeShade = (label) => {
  if (!label) return "";
  const l = label.trim().toLowerCase();
  if (l === "new") return "bg-blue-100 text-blue-800";
  if (l === "premium") return "bg-purple-100 text-purple-800";
  if (l === "bestseller") return "bg-green-100 text-green-800";
  return "bg-gray-100 text-gray-700";
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
    tags: "",
    statusBadge: "",
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/admin/products");
      setProducts(data);
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
    };
    try {
      if (editing) await API.put(`/admin/products/${editing}`, payload);
      else await API.post("/admin/products", payload);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
        tags: "",
        statusBadge: "",
      });
      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch {}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await API.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="px-8 py-10 bg-neutral-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Manage Products</h1>
          <p className="text-gray-500 mt-1">Add, edit, and manage your product inventory</p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <PlusCircle size={20} />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Sold</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={10} className="py-10 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-3 font-semibold">{p.name}</td>
                <td className="px-4 py-3 truncate max-w-[220px] text-gray-600">{p.description}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 font-semibold">₹{p.price}</td>
                <td className="px-4 py-3">{p.stock}</td>
                <td className="px-4 py-3">{p.totalSold || 0}</td>
                <td className="px-4 py-3">{Number(p.rating || 0).toFixed(1)} <span className="text-yellow-400">★</span></td>
                <td className="px-4 py-3">
                  {p.statusBadge ? (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeShade(p.statusBadge)}`}>
                      {p.statusBadge}
                    </span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="relative">
                      <button
                        onClick={() => {
                          setForm({ ...p, tags: p.tags?.join(", ") || "" });
                          setEditing(p._id);
                          setShowForm(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title="Edit"
                      >
                        <Pencil size={18} className="text-blue-600 group-hover:text-blue-800" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
                          Edit
                        </span>
                      </button>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 hover:bg-gray-100 rounded group"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600 group-hover:text-red-800" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition bg-gray-900 text-white text-xs px-2 py-1 rounded shadow z-10 whitespace-nowrap">
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

      {/* Add/Edit Form Drawer */}
      {showForm && (
        <div className="fixed inset-0 flex justify-end bg-black/40 z-40">
          <div className="w-full sm:w-[450px] bg-white p-8 shadow-2xl overflow-y-auto rounded-l-xl relative">
            <h2 className="text-xl font-bold mb-4">{editing ? "Edit Product" : "Add New Product"}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input
                  placeholder="e.g. Apple iPhone 15"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Product short description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2 space-y-2">
                  <label className="text-sm font-medium">Price</label>
                  <input
                    placeholder="0"
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <label className="text-sm font-medium">Stock</label>
                  <input
                    placeholder="0"
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORY_OPTIONS.map((cat) =>
                    <option key={cat} value={cat}>{cat}</option>
                  )}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <input
                  placeholder="https://image.url/"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags <span className="text-gray-400">(comma separated)</span></label>
                <input
                  placeholder="e.g. flagship, android"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Badge <span className="text-gray-400">(e.g. New, Premium)</span></label>
                <input
                  placeholder="e.g. New, Premium"
                  value={form.statusBadge}
                  onChange={(e) => setForm({ ...form, statusBadge: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                >
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
