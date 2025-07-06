"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AdmitCardPDF = () => {
  const componentRef = useRef();

  const handleDownloadPDF = async () => {
    const element = componentRef.current;

    // Make sure it's fully visible
    element.style.width = "100%";

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("admit-card.pdf");
  };
  return (
    <div className="p-6">
      <button
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>

      <div
        ref={componentRef}
        className="bg-white p-16 text-sm text-black border border-gray-400"
      >
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-xl font-bold uppercase">Hamdard University</h1>
          <p className="text-sm">
            Faculty of Engineering Sciences & Technology
          </p>
          <h2 className="text-lg mt-2 font-semibold">
            Admission Entrance Test, Admit Card (Fall-2024)
          </h2>
        </div>

        {/* Applicant Info */}
        <p className="text-right text-lg pt-1">
          Voucher Payment Status:{" "}
          <span className="text-yellow-600 font-bold">Pending</span>
        </p>
        <div className="grid grid-cols-2 gap-2 mt-4 text-lg">
          <p>
            <b>Applicant ID:</b> 113837
          </p>
          <p className="border-b pb-2">
            <b>Father Name:</b> Muhammad Shahid
          </p>
          <p className="border-b pb-2">
            <b>Name:</b> Muhammad Shayan
          </p>
          <p className="border-b pb-2">
            <b>Date of Birth:</b> 09-JUN-05
          </p>
          <p className="border-b pb-2">
            <b>CNIC No:</b> 03202424545
          </p>
          <p className="border-b pb-2">
            <b>Email:</b> shayanshahid991@gmail.com
          </p>
          <p className="border-b pb-2">
            <b>Gender:</b> Male
          </p>
          <p className="border-b pb-2">
            <b>Test Center:</b> -
          </p>
          <p className="col-span-2 border-b">
            <b>Address:</b> Sector 11 A, North Karachi
          </p>
        </div>

        {/* Program Preferences */}
        <div className="mt-6">
          <h3 className="font-bold text-center text-xl">Program Preferences</h3>
          <table className="w-full border mt-2 text-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-1 text-center">Preference</th>
                <th className="border p-1">Program</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Bachelor of Science in Computer Science",
                "Master of Science (Computer & Communication Networks)",
                "Bachelor of Engineering in Computer Systems Engineering",
                "BS (Digital Systems and Web Technologies)",
                "Associate Degree (Digital Media & Broadcasting)",
              ].map((program, idx) => (
                <tr key={idx}>
                  <td className="border p-1 text-center">{idx + 1}</td>
                  <td className="border p-1">{program}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education Details */}
        <div className="mt-6">
          <h3 className="font-bold text-center text-xl">Education Details</h3>
          <table className="w-full border mt-2 text-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-1">Academic Qualification</th>
                <th className="border p-1">Subject</th>
                <th className="border p-1">Total Marks</th>
                <th className="border p-1">Obtained Marks</th>
                <th className="border p-1">Percent</th>
                <th className="border p-1">Result</th>
              </tr>
            </thead>
            <tbody>
              {Array(5)
                .fill()
                .map((_, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="border p-1">MATRIC</td>
                    <td className="border p-1">Computer Science</td>
                    <td className="border p-1">1100</td>
                    <td className="border p-1">886</td>
                    <td className="border p-1">81%</td>
                    <td className="border p-1">Passed</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Test Date / Notes */}
        <div className="mt-6 text-lg">
          <p>
            <b>Note:</b>
          </p>
          <ol className="">
            <li>1. Please bring your Admit Card and CNIC/B-Form...</li>
            <li>
              2. Original academic documents are required at the time of interview.
            </li>
          </ol>
        </div>
        <div className="flex justify-end">
          <div className="text-md w-[35%]">
            <hr />
            <h3 className="font-bold text-center">Incharge Admissions</h3>
            <p>
              This is a computer generate document. No signature is required.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 border-black border-t-2 border-dashed pt-2 text-lg">
          <div className="flex justify-between">
            <p className="font-bold">For offer use only</p>
            <p className="text-right text-lg pt-1">
              Voucher Payment Status:{" "}
              <span className="text-yellow-600 font-bold">Pending</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div>
              <p>
                <b>Applicant ID:</b> 113837
              </p>
              <p>
                <b>Name:</b> Muhammad Shayan
              </p>
              <p>
                <b>Father Name:</b> Muhammad Shahid
              </p>
            </div>
            <div>
              <p>
                <b>Campus:</b> Main Campus
              </p>
              <p>
                <b>Faculty:</b> Engineering Sciences & Tech
              </p>
              <p>
                <b>Program:</b> BS in Computer Science
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardPDF;
