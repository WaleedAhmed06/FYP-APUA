import React, { useState } from "react";

const QualificationInfo = () => {
  const [data, setData] = useState([
    {
      qualification: "Intermediate/Equivalent",
      subject: "Science",
      obtainedMarks: "489",
      totalMarks: "550",
      cgpa: "-",
      board: "Hyderabad board",
      year: "2024",
      status: "Result/Document Awaited",
    },
    {
      qualification: "MATRIC",
      subject: "Science",
      obtainedMarks: "493",
      totalMarks: "550",
      cgpa: "-",
      board: "Hyderabad board",
      year: "2021",
      status: "Passed",
    },
  ]);

  const [form, setForm] = useState({
    qualification: "",
    subject: "",
    obtainedMarks: "",
    totalMarks: "",
    cgpa: "",
    board: "",
    year: "",
    status: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setEditIndex(null);
    setForm({
      qualification: "",
      subject: "",
      obtainedMarks: "",
      totalMarks: "",
      cgpa: "",
      board: "",
      year: "",
      status: "",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setForm(data[index]);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setForm({
      qualification: "",
      subject: "",
      obtainedMarks: "",
      totalMarks: "",
      cgpa: "",
      board: "",
      year: "",
      status: "",
    });
    setEditIndex(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = form;
      setData(updatedData);
    } else {
      setData([...data, form]);
    }
    handleModalClose();
  };

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg">
      {/* Qualification Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Qualification Detail</h2>
        <button
          onClick={handleAddClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Add Qualification
        </button>
      </div>

      {/* Qualification Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2">Qualification</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Obtained Marks</th>
              <th className="px-4 py-2">Total Marks</th>
              <th className="px-4 py-2">CGPA</th>
              <th className="px-4 py-2">Board / University</th>
              <th className="px-4 py-2">Passing Year</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2">{item.qualification}</td>
                <td className="px-4 py-2">{item.subject}</td>
                <td className="px-4 py-2">{item.obtainedMarks}</td>
                <td className="px-4 py-2">{item.totalMarks}</td>
                <td className="px-4 py-2">{item.cgpa}</td>
                <td className="px-4 py-2">{item.board}</td>
                <td className="px-4 py-2">{item.year}</td>
                <td className="px-4 py-2">{item.status}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-4/5 overflow-auto">
            <h3 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Qualification" : "Add Qualification"}
            </h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={form.qualification}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Obtained Marks
                </label>
                <input
                  type="number"
                  name="obtainedMarks"
                  value={form.obtainedMarks}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Marks
                </label>
                <input
                  type="number"
                  name="totalMarks"
                  value={form.totalMarks}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CGPA
                </label>
                <input
                  type="text"
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Board / University
                </label>
                <input
                  type="text"
                  name="board"
                  value={form.board}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Passing Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={form.status}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QualificationInfo;
