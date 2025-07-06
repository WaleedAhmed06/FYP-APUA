import React, { useState } from "react";

const AdmissionFormList = () => {
  const data = [
    {
      id: 129175,
      inquiryDate: "09-Dec-2024",
      studentName: "Safia Ahmed",
      status: "No Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (RIS)",
      offerType: "Spring-2025",
      cellNo: "03312321838",
      offerLetterAmount: "52,500",
    },
    {
      id: 129162,
      inquiryDate: "08-Dec-2024",
      studentName: "Rehman",
      status: "Unpaid Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (DFCS)",
      offerType: "Spring-2025",
      cellNo: "03150212162",
      offerLetterAmount: "52,500",
    },
    {
      id: 129162,
      inquiryDate: "08-Dec-2024",
      studentName: "Abdul",
      status: "Unpaid Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (DFCS)",
      offerType: "Spring-2025",
      cellNo: "03150212162",
      offerLetterAmount: "52,500",
    },
    {
      id: 129162,
      inquiryDate: "08-Dec-2024",
      studentName: "Zoya Saeed",
      status: "Unpaid Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (DFCS)",
      offerType: "Spring-2025",
      cellNo: "03150212162",
      offerLetterAmount: "52,500",
    },
    {
      id: 129162,
      inquiryDate: "08-Dec-2024",
      studentName: "Ahmed",
      status: "Unpaid Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (DFCS)",
      offerType: "Spring-2025",
      cellNo: "03150212162",
      offerLetterAmount: "52,500",
    },
    {
      id: 129162,
      inquiryDate: "08-Dec-2024",
      studentName: "Dua Rahim",
      status: "Unpaid Voucher",
      project: "NNKDA",
      faculty: "FEST",
      program: "BS (DFCS)",
      offerType: "Spring-2025",
      cellNo: "03150212162",
      offerLetterAmount: "52,500",
    },
    // Add more rows as needed
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((row) => (row.id === selectedRow.id ? selectedRow : row))
    );
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow({ ...selectedRow, [name]: value });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold text-black">Send Offer Letter</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Send To All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-green-200 text-left">
              <th className="border border-gray-300 px-4 py-2">App ID</th>
              <th className="border border-gray-300 px-4 py-2">Inquiry Date</th>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Project</th>
              <th className="border border-gray-300 px-4 py-2">Faculty</th>
              <th className="border border-gray-300 px-4 py-2">Program</th>
              <th className="border border-gray-300 px-4 py-2">Offer Type</th>
              <th className="border border-gray-300 px-4 py-2">Cell No</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
              <th className="border border-gray-300 px-4 py-2">
                Offer Letter Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.inquiryDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.studentName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.project}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.faculty}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.program}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.offerType}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.cellNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => openModal(row)}
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.offerLetterAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Details</h2>
            {Object.keys(selectedRow).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  name={key}
                  value={selectedRow[key]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full px-3 py-2"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionFormList;
