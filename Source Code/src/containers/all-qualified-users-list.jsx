import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DrawerWithNavigation } from "../components/drawer";
import { useToast } from "../hooks/useToast";

export default function QualifiedUserList() {
  const { showToast } = useToast();
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);


  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);
        setLoading(true);
        const res = await axios.get("/api/auth/qualified", {
          params: {
            page,
            search: debouncedSearch,
            limit: pageSize,
          },
        });
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
        setTotalRecords(res.data.total);
      } catch (err) {
        setError(err.response?.data || err.message || "An error occurred while fetching users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, debouncedSearch, pageSize]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/offer-letters/send", {
        userIds: selectedIds,
      });

      const msg = `${data.msg} sent: ${data.sentCount}, failed: ${data.failedCount}`;
      showToast(msg, "success");
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to send offer letters:", err);
      showToast("Failed to send offer letters", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div><DrawerWithNavigation /></div>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Qualified Users</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Name or Program"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full text-left border-collapse">
            <thead className="bg-green-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-2 border text-center">
                  <div className="flex align-middle justify-center space-x-2">
                    <input
                      type="checkbox"
                      checked={
                        users.length > 0 && users.every((user) => selectedIds.includes(user._id))
                      }
                      onChange={() => {
                        if (users.every((user) => selectedIds.includes(user._id))) {
                          // Unselect all visible
                          setSelectedIds((prev) =>
                            prev.filter((id) => !users.some((u) => u._id === id))
                          );
                        } else {
                          // Add only the visible ones
                          setSelectedIds((prev) => {
                            const visibleIds = users.map((u) => u._id);
                            return [...new Set([...prev, ...visibleIds])];
                          });
                        }
                      }}
                      aria-label="Select all users on this page"
                    />
                    <p className="text-gray-600">Select all</p>
                  </div>
                </th>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Program</th>
                <th className="px-4 py-2 border">Father Name</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user._id)}
                        onChange={() => toggleSelect(user._id)}
                      />
                    </td>
                    <td className="px-4 py-2 border">
                      {(page - 1) * pageSize + index + 1}
                    </td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.program}</td>
                    <td className="px-4 py-2 border">{user.fatherName}</td>
                    <td className="px-4 py-2 border">{user.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">
                    <div>No qualified users found.</div>
                    <div>{error}</div>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="px-4 py-3 border-t">
                  <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 md:gap-6 text-sm text-gray-700 flex-wrap">

                    {/* ✅ Left: Showing X–Y of Z */}
                    <div className="whitespace-nowrap">
                      Showing{" "}
                      <span className="font-semibold">{(page - 1) * pageSize + 1}</span>
                      –
                      <span className="font-semibold">
                        {Math.min(page * pageSize, totalRecords)}
                      </span>{" "}
                      of <span className="font-semibold">{totalRecords}</span> records
                    </div>

                    {/* ✅ Center: Pagination */}
                    <div className="flex flex-wrap items-center gap-1">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-3 py-1 rounded border transition ${page === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        Prev
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNumber = i + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          Math.abs(pageNumber - page) <= 1
                        ) {
                          return (
                            <button
                              key={i}
                              className={`px-3 py-1 rounded border transition ${page === pageNumber
                                  ? "bg-green-500 text-white"
                                  : "bg-white hover:bg-gray-100 text-gray-700"
                                }`}
                              onClick={() => setPage(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          (pageNumber === page - 2 && page > 3) ||
                          (pageNumber === page + 2 && page < totalPages - 2)
                        ) {
                          return (
                            <span key={i} className="px-2 text-gray-400">
                              ...
                            </span>
                          );
                        } else {
                          return null;
                        }
                      })}

                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        className={`px-3 py-1 rounded border transition ${page === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        Next
                      </button>
                    </div>

                    {/* ✅ Right: Page size selector */}
                    <div className="flex items-center gap-2 min-h-[40px] whitespace-nowrap">
                      <label htmlFor="pageSize" className="text-gray-600">
                        Rows per page:
                      </label>
                      <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(Number(e.target.value));
                          setPage(1);
                        }}
                        className="border rounded px-2 py-1.5 text-sm leading-5 h-7 focus:outline-none focus:ring-2 focus:ring-green-500 transition bg-white"
                      >
                        {[20, 50, 100].map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </td>
              </tr>
            </tfoot>

          </table>
        </div>


        {/* Floating Animated Send Button */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6"
            >
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg"
              >
                Send Offer Letter ({selectedIds.length})
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
