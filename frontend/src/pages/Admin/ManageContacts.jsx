import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { format } from "date-fns";
import { FiTrash2, FiMail, FiPhone } from "react-icons/fi";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch contacts from API
const fetchContacts = async () => {
  try {
    setLoading(true);
    const res = await API.get("/admin/contacts");
    console.log("Fetched contacts:", res.data);

    // 👇 correctly set contacts array
    setContacts(res.data.contacts || []);
    setFiltered(res.data.contacts || []);
  } catch (err) {
    setError("Failed to load contacts.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle search
  useEffect(() => {
    if (!search) {
      setFiltered(contacts);
    } else {
      const lower = search.toLowerCase();
      setFiltered(
        contacts.filter(
          (c) =>
            c.fullName.toLowerCase().includes(lower) ||
            c.email.toLowerCase().includes(lower) ||
            c.applicationType.toLowerCase().includes(lower)
        )
      );
    }
  }, [search, contacts]);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await API.delete(`/admin/contacts/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      alert("Failed to delete message");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 text-lg">
        Loading contacts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📩 Manage Contacts</h2>

      {/* Search */}
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name, email, or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#111827] text-gray-200 px-4 py-2 rounded-lg w-72 outline-none border border-gray-700 focus:border-cyan-400"
        />
        <button
          onClick={fetchContacts}
          className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
        >
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-[#1F2937] text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr key={c._id} className="hover:bg-[#111827]">
                  <td className="px-4 py-3 font-medium text-gray-100">
                    {c.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-300 flex items-center gap-2">
                    <FiMail className="text-cyan-400" /> {c.email}
                  </td>
                  <td className="px-4 py-3 text-gray-300 flex items-center gap-2">
                    <FiPhone className="text-green-400" /> {c.phone}
                  </td>
                  <td className="px-4 py-3 capitalize text-gray-300">
                    {c.applicationType}
                  </td>
                  <td className="px-4 py-3 text-gray-400 max-w-xs truncate">
                    {c.message}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {format(new Date(c.createdAt), "dd MMM yyyy, HH:mm")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center text-gray-400 py-6 font-medium"
                >
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContacts;
