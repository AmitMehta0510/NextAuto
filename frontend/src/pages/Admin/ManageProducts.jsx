import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { Pencil, Trash2, PlusCircle, Upload } from "lucide-react";
import toast from "react-hot-toast";

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
    stock: "",
    tags: "",
    statusBadge: "",
    images: [],
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/admin/products");
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Cloudinary upload handler
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    setUploading(true);
    try {
      const formData = new FormData();
      for (let f of files) formData.append("images", f);
      const { data } = await API.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
      toast.success("Images uploaded!");
    } catch (err) {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

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
      toast.success(editing ? "Product updated" : "Product created");
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        tags: "",
        statusBadge: "",
        images: [],
      });
      setEditing(null);
      setShowForm(false);
      fetchProducts();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/admin/products/${id}`);
      fetchProducts();
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="px-3 sm:px-6 md:px-8 py-6 sm:py-10 bg-neutral-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Manage Products
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Add, edit, and manage your product inventory
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg shadow"
        >
          <PlusCircle size={20} />
          Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow">
        <table className="min-w-[600px] w-full text-xs sm:text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Images</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Category</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Price</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Stock</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Status</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  <div className="flex -space-x-2">
                    {(p.images || [p.image]).slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={p.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-md border object-cover"
                      />
                    ))}
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">{p.name}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">{p.category}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">₹{p.price}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">{p.stock}</td>
                <td className="px-2 sm:px-4 py-2 sm:py-3">
                  {p.statusBadge ? (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeShade(p.statusBadge)}`}>
                      {p.statusBadge}
                    </span>
                  ) : (
                    <span className="text-gray-300">-</span>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 flex gap-2">
                  <button
                    onClick={() => {
                      setForm({ ...p, tags: p.tags?.join(", ") || "" });
                      setEditing(p._id);
                      setShowForm(true);
                    }}
                    className="p-1 sm:p-1.5 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-1 sm:p-1.5 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-xs sm:max-w-lg md:max-w-2xl rounded-2xl shadow-2xl relative p-4 sm:p-8 overflow-y-auto max-h-[95vh]">
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 hover:text-gray-600 text-lg"
            >
              ❌
            </button>
            <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6">
              {editing ? "Edit Product" : "Add Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-5">
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  rows={3}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="w-full sm:w-1/2 space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Price</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                    required
                  />
                </div>
                <div className="w-full sm:w-1/2 space-y-1 sm:space-y-2">
                  <label className="text-xs sm:text-sm font-medium">Stock</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {/* Image Upload */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Upload Images</label>
                <div className="flex items-center gap-2 sm:gap-3">
                  <input
                    type="file"
                    multiple
                    onChange={handleImageUpload}
                    className="border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 w-full"
                  />
                  {uploading ? (
                    <span className="text-blue-600 text-xs sm:text-sm">Uploading...</span>
                  ) : (
                    <Upload size={18} className="text-gray-600" />
                  )}
                </div>
                <div className="flex gap-1 sm:gap-2 flex-wrap mt-2">
                  {form.images.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="uploaded"
                      className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg object-cover border"
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Tags</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  placeholder="e.g. premium, bestseller"
                />
              </div>
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs sm:text-sm font-medium">Status Badge</label>
                <input
                  value={form.statusBadge}
                  onChange={(e) => setForm({ ...form, statusBadge: e.target.value })}
                  className="w-full border px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg"
                  placeholder="New / Premium / Bestseller"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-5 sm:mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditing(null);
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-1.5 sm:py-2.5 bg-blue-600 text-white rounded-lg"
                >
                  {editing ? "Update Product" : "Create Product"}
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
