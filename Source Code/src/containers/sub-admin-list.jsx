import React, { useState, useEffect } from "react";

export default function SubAdmins() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  // Simulated API call to fetch data
  useEffect(() => {
    const fetchSubAdmins = async () => {
      const data = [
        { id: 1, name: "Omer Khan", email: "omer33@example.com", role: "Manager", phoneNo: 92765468765 },
        { id: 2, name: "Salman Ali", email: "salman21@example.com", role: "Supervisor", phoneNo: 927864728963 },
        { id: 3, name: "Ali Ahmed", email: "aliahmed2@example.com", role: "Manager", phoneNo: 92765468765 },
        { id: 4, name: "Junaid Ali", email: "junaid32ali@example.com", role: "Supervisor", phoneNo: 927864728963 },
        { id: 5, name: "Faheem Khan", email: "khan32@example.com", role: "Supervisor", phoneNo: 927864728963 },
      ];
      setSubAdmins(data);
      setFilteredAdmins(data);
    };
    fetchSubAdmins();
  }, []);

  // Handle search
  useEffect(() => {
    if (search) {
      setFilteredAdmins(
        subAdmins.filter((admin) =>
          admin.name.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredAdmins(subAdmins);
    }
  }, [search, subAdmins]);

  // Handle Modal Open/Close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditAdmin(null); // Reset edit state
  };

  // Handle Save (Add/Edit)
  const handleSave = (newAdmin) => {
    if (editAdmin) {
      // Update admin
      setSubAdmins((prev) =>
        prev.map((admin) => (admin.id === editAdmin.id ? { ...newAdmin, id: editAdmin.id } : admin))
      );
    } else {
      // Add new admin
      setSubAdmins((prev) => [...prev, { ...newAdmin, id: Date.now() }]);
    }
    toggleModal();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sub Admin List</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          onClick={toggleModal}
        >
          + Add User
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Sub Admin Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Role</th>
              <th className="p-3 border border-gray-300">Phone No</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="hover:bg-green-50">
                <td className="p-3 border border-gray-300">{admin.name}</td>
                <td className="p-3 border border-gray-300">{admin.email}</td>
                <td className="p-3 border border-gray-300">{admin.role}</td>
                <td className="p-3 border border-gray-300">{admin.phoneNo}</td>

                <td className="p-3 border border-gray-300">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => {
                      setEditAdmin(admin);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() =>
                      setSubAdmins((prev) => prev.filter((item) => item.id !== admin.id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ModalForm
          onClose={toggleModal}
          onSave={handleSave}
          editData={editAdmin}
        />
      )}
    </div>
  );
}

function ModalForm({ onClose, onSave, editData }) {
  const [name, setName] = useState(editData?.name || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [role, setRole] = useState(editData?.role || "");
  const [number, setNumber] = useState(editData?.number || null);

  const handleSubmit = () => {
    if (name && email && role) {
      onSave({ name, email, role, number });
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{editData ? "Edit User" : "Add User"}</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Role</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Phone No</label>
          <input
            type="numer"
            className="w-full px-4 py-2 border rounded-lg"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
