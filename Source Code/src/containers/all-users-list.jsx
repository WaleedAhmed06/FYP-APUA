import React, { useState, useEffect } from 'react';

export default function UserList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // Simulate fetching data from an API or database
  useEffect(() => {
    const fetchStudents = () => {
        const data = [
            { 
              id: 1, 
              name: "Ali Khan", 
              email: "ali.khan@example.com", 
              fatherName: "Ahmed Khan", 
              course: "Computer Science", 
              phoneNo: "03121234567", 
              lastUpdate: "2024-01-10" 
            },
            { 
              id: 2, 
              name: "Fatima Iqbal", 
              email: "fatima.iqbal@example.com", 
              fatherName: "Rashid Iqbal", 
              course: "Mechanical Engineering", 
              phoneNo: "03876543210", 
              lastUpdate: "2024-01-12" 
            },
            { 
              id: 3, 
              name: "Imran Ali", 
              email: "imran.ali@example.com", 
              fatherName: "Nadeem Ali", 
              course: "Electrical Engineering", 
              phoneNo: "03012345678", 
              lastUpdate: "2024-01-15" 
            },
            { 
              id: 4, 
              name: "Sana Ahmed", 
              email: "sana.ahmed@example.com", 
              fatherName: "Arshad Ahmed", 
              course: "Civil Engineering", 
              phoneNo: "03399887766", 
              lastUpdate: "2023-01-18" 
            },
            { 
              id: 5, 
              name: "Muneeb Shah", 
              email: "muneeb.shah@example.com", 
              fatherName: "Shahbaz Shah", 
              course: "Business Administration", 
              phoneNo: "03255667788", 
              lastUpdate: "2023-01-20" 
            },
            { 
              id: 6, 
              name: "Zainab Khan", 
              email: "zainab.khan@example.com", 
              fatherName: "Zahid Khan", 
              course: "Software Engineering", 
              phoneNo: "03111223344", 
              lastUpdate: "2023-01-22" 
            },
            { 
              id: 7, 
              name: "Asad Mehmood", 
              email: "asad.mehmood@example.com", 
              fatherName: "Mehmood Ahmed", 
              course: "Mechanical Engineering", 
              phoneNo: "03445566789", 
              lastUpdate: "2023-01-25" 
            },
            { 
              id: 8, 
              name: "Ayesha Khan", 
              email: "ayesha.khan@example.com", 
              fatherName: "Sikandar Khan", 
              course: "Architecture", 
              phoneNo: "03234455677", 
              lastUpdate: "2022-01-28" 
            },
            { 
              id: 9, 
              name: "Hassan Raza", 
              email: "hassan.raza@example.com", 
              fatherName: "Raza Ali", 
              course: "Electrical Engineering", 
              phoneNo: "03099887755", 
              lastUpdate: "2022-01-30" 
            },
            { 
              id: 10, 
              name: "Kiran Bibi", 
              email: "kiran.bibi@example.com", 
              fatherName: "Ali Bibi", 
              course: "Medicine", 
              phoneNo: "03344556677", 
              lastUpdate: "2022-02-02" 
            },
          ];
          
      setStudents(data);
      setFilteredStudents(data);
    };
    fetchStudents();
  }, []);

  // Handle search
  useEffect(() => {
    if (search) {
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(search.toLowerCase()) ||
          student.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [search, students]);

  // Toggle modal for adding/editing student
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditStudent(null); // Reset for new entries
  };

  // Handle save (Add/Edit)
  const handleSave = (newStudent) => {
    if (editStudent) {
      // Update student
      setStudents((prev) =>
        prev.map((student) => (student.id === editStudent.id ? { ...newStudent, id: editStudent.id } : student))
      );
    } else {
      // Add new student
      setStudents((prev) => [...prev, { ...newStudent, id: Date.now() }]);
    }
    toggleModal();
  };

  // Handle Delete
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Application List</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          onClick={toggleModal}
        >
          + Add Student
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

      {/* Student List Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Email</th>
              <th className="p-3 border border-gray-300">Father's Name</th>
              <th className="p-3 border border-gray-300">Program</th>
              <th className="p-3 border border-gray-300">Phone No</th>
              <th className="p-3 border border-gray-300">Last Update</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-green-50">
                <td className="p-3 border border-gray-300">{student.name}</td>
                <td className="p-3 border border-gray-300">{student.email}</td>
                <td className="p-3 border border-gray-300">{student.fatherName}</td>
                <td className="p-3 border border-gray-300">{student.course}</td>
                <td className="p-3 border border-gray-300">{student.phoneNo}</td>
                <td className="p-3 border border-gray-300">{student.lastUpdate}</td>
                <td className="p-3 border border-gray-300">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => {
                      setEditStudent(student);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <ModalForm
          onClose={toggleModal}
          onSave={handleSave}
          editData={editStudent}
        />
      )}
    </div>
  );
}

// Modal Form Component for Add/Edit Student
function ModalForm({ onClose, onSave, editData }) {
  const [name, setName] = useState(editData?.name || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [fatherName, setFatherName] = useState(editData?.fatherName || "");
  const [course, setCourse] = useState(editData?.course || "");
  const [phoneNo, setPhoneNo] = useState(editData?.phoneNo || "");
  const [lastUpdate, setLastUpdate] = useState(editData?.lastUpdate || "");

  const handleSubmit = () => {
    if (name && email && fatherName && course && phoneNo && lastUpdate) {
      onSave({ name, email, fatherName, course, phoneNo, lastUpdate });
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-auto">
      <h2 className="text-xl font-bold mb-4">{editData ? "Edit Student" : "Add Student"}</h2>
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
          <label className="block mb-2 font-semibold">Father's Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Course</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Phone No</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Last Update</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg"
            value={lastUpdate}
            onChange={(e) => setLastUpdate(e.target.value)}
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
