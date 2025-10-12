import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { format } from "date-fns";
import { FiTrash2, FiMail, FiPhone, FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";

// Loader row
const SkeletonRow = () => (
  <tr>
    {Array(6)
      .fill(0)
      .map((_, idx) => (
        <td key={idx} className="px-2 sm:px-4 py-2 sm:py-3">
          <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
      ))}
  </tr>
);

const PAGE_SIZE = 10;

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: PAGE_SIZE,
        applicationType: filterType || undefined,
      };
      const res = await API.get("/admin/contacts", { params });
      setContacts(res.data.contacts || []);
      setTotalPages(res.data.pages);
    } catch {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line
  }, [page, filterType]);

  const filteredContacts =
    search.length > 0
      ? contacts.filter((c) => {
          const lower = search.toLowerCase();
          return (
            c.fullName.toLowerCase().includes(lower) ||
            c.email.toLowerCase().includes(lower) ||
            c.phone.toLowerCase().includes(lower)
          );
        })
      : contacts;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await API.delete(`/admin/contacts/${id}`);
      toast.success("Contact deleted");
      fetchContacts();
    } catch {
      toast.error("Failed to delete message");
    }
  };

  const openModal = async (id) => {
    try {
      const res = await API.get(`/admin/contacts/${id}`);
      setSelectedContact(res.data.contact);
      setModalOpen(true);
    } catch {
      toast.error("Failed to load contact");
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-5 sm:mb-7 gap-4 sm:gap-6">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Manage Contacts
          </h1>
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
            View, filter, and manage messages sent by users.
          </p>
        </div>
        {/* Search & Filter */}
        <div className="flex gap-2 sm:gap-3 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm w-44 sm:w-60 bg-white"
            aria-label="Search contacts"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 border rounded-md text-xs sm:text-sm bg-white"
            aria-label="Filter by type"
          >
            <option value="">All Types</option>
            <option value="industrial">Industrial</option>
            <option value="agriculture">Agriculture</option>
            <option value="residential">Residential</option>
          </select>
          <button
            onClick={fetchContacts}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition font-semibold text-xs sm:text-base"
          >
            Refresh
          </button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Name</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Email</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Phone</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Type</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Date</th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(PAGE_SIZE)
                .fill(0)
                .map((_, i) => <SkeletonRow key={i} />)
            ) : filteredContacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-2 sm:px-4 py-4 sm:py-6 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            ) : (
              filteredContacts.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 sm:py-3">{c.fullName}</td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <span className="inline-flex items-center gap-1">
                      <FiMail className="text-cyan-500" /> <span>{c.email}</span>
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3">
                    <span className="inline-flex items-center gap-1">
                      <FiPhone className="text-green-500" /> <span>{c.phone}</span>
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 capitalize">
                    {c.applicationType}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-500 whitespace-nowrap">
                    {format(new Date(c.createdAt), "dd MMM yyyy, HH:mm")}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-3 flex gap-2">
                    <button
                      onClick={() => openModal(c._id)}
                      className="p-1 bg-cyan-50 hover:bg-cyan-100 rounded focus:outline-none"
                      aria-label="View Message"
                      title="View Full Message"
                    >
                      <FiEye size={16} className="text-cyan-700" />
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="p-1 bg-red-50 hover:bg-red-100 rounded focus:outline-none"
                      aria-label="Delete"
                      title="Delete"
                    >
                      <FiTrash2 size={16} className="text-red-600" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="sticky bottom-0 left-0 w-full flex justify-center items-center gap-2 py-3 sm:py-4 bg-white border-t border-gray-300"
          style={{ boxShadow: "0 -2px 8px rgba(0,0,0,0.03)" }}
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs sm:text-base"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-gray-700 px-1 sm:px-2 text-xs sm:text-sm">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-xs sm:text-base"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-xs sm:max-w-md relative shadow-xl"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl font-bold"
              aria-label="Close Message Modal"
            >
              &times;
            </button>
            <h3 className="text-base sm:text-xl font-semibold mb-2">
              {selectedContact.fullName}
            </h3>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">
              <strong>Phone:</strong> {selectedContact.phone}
            </p>
            <p className="text-gray-700 mb-1 text-xs sm:text-sm">
              <strong>Type:</strong> {selectedContact.applicationType}
            </p>
            <p className="text-gray-700 mb-2 text-xs sm:text-sm">
              <strong>Sent At:</strong>{" "}
              {format(
                new Date(selectedContact.createdAt),
                "dd MMM yyyy, HH:mm"
              )}
            </p>
            <div className="bg-gray-50 rounded-md p-2 sm:p-3 text-gray-800 text-xs sm:text-sm">
              {selectedContact.message}
            </div>
          </div>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div className="mt-6 sm:mt-8 text-center text-red-600 text-sm sm:text-lg font-semibold flex items-center justify-center gap-2">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ManageContacts;
