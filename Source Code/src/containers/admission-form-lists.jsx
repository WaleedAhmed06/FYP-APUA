import React from "react";

const AdmissionFormList = () => {
  const data = [
    {
      id: 1,
      fatherName: "Nazim Ahmed",
      studentEmail: "safia.a2005@gmail.com",
      verificationCode: "9HRC",
      lastUpdated: "2024-12-09 (00:00)",
      studentProvince: 6,
    },
    {
      id: 2,
      fatherName: "Muhammad Saleem",
      studentEmail: "firefoxbpo@gmail.com",
      verificationCode: "MEU7",
      lastUpdated: "2024-12-08 (00:00)",
      studentProvince: 6,
    },
    {
      id: 3,
      fatherName: "Syed Shahid Hussain",
      studentEmail: "ishfatabool2468@gmail.com",
      verificationCode: "5KL4",
      lastUpdated: "2024-12-08 (00:00)",
      studentProvince: 6,
    },
    // Add more rows as needed
  ];

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">Offer Letter</th>
              <th className="border border-gray-300 px-4 py-2">Father Name</th>
              <th className="border border-gray-300 px-4 py-2">Student Email</th>
              <th className="border border-gray-300 px-4 py-2">Verification Code</th>
              <th className="border border-gray-300 px-4 py-2">Last Updated</th>
              <th className="border border-gray-300 px-4 py-2">Student Province</th>
              <th className="border border-gray-300 px-4 py-2">Print</th>
              <th className="border border-gray-300 px-4 py-2">Reset Password</th>
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
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className={`${
                      row.offerLetterAmount
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } px-3 py-1 rounded hover:opacity-90`}
                  >
                    {row.offerLetterAmount
                      ? "Print Offer Letter"
                      : "First Enter Offer Letter Amount then Print Offer Letter"}
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.fatherName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.studentEmail}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.verificationCode}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.lastUpdated}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.studentProvince}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Print
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionFormList;
