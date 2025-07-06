import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const GeneralInfo = ({ data, setData }) => {
  // Set the initial values from the parent data prop
  const initialValues = {
    studentName: data?.studentName || "",
    fatherName: data?.fatherName || "",
    studentNIC: data?.studentNIC || "",
    dateOfBirth: data?.dateOfBirth || "",
    studentCellNo: data?.studentCellNo || "",
    studentEmail: data?.studentEmail || "",
    applicantID: data?.applicantID || "",
    testCenter: data?.testCenter || "",
    gender: data?.gender || "",
    heardFrom: data?.heardFrom || "",
    province: data?.province || "",
    address: data?.address || "",
    picture: data?.picture || null,
  };

  const validationSchema = Yup.object({
    studentName: Yup.string().required("Student name is required"),
    fatherName: Yup.string().required("Father name is required"),
    studentNIC: Yup.string()
      .matches(/^\d{13}$/, "NIC must be a 13-digit number")
      .required("NIC is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    studentCellNo: Yup.string()
      .matches(/^\d{11}$/, "Invalid cell number")
      .required("Cell number is required"),
    studentEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    applicantID: Yup.string().required("Applicant ID is required"),
    testCenter: Yup.string().required("Please select a test center"),
    gender: Yup.string().required("Please select a gender"),
    heardFrom: Yup.string().required("Please specify how you heard about us"),
    province: Yup.string().required("Please select a province"),
    address: Yup.string().required("Address is required"),
    picture: Yup.mixed().required("Picture is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data Submitted: ", values);
    setData({data,...values});
  };

  return (
    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">General Info</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Name
              </label>
              <Field
                name="studentName"
                type="text"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="studentName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Father Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Father Name
              </label>
              <Field
                name="fatherName"
                type="text"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="fatherName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Student NIC */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student NIC
              </label>
              <Field
                name="studentNIC"
                type="number"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="studentNIC"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <Field
                name="dateOfBirth"
                type="date"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="dateOfBirth"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Student Cell No */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cell No
              </label>
              <Field
                name="studentCellNo"
                type="number"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="studentCellNo"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Student Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Student Email
              </label>
              <Field
                name="studentEmail"
                type="email"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="studentEmail"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Applicant ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Applicant ID
              </label>
              <Field
                name="applicantID"
                type="text"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="applicantID"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Test Center */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Test Center
              </label>
              <Field
                name="testCenter"
                as="select"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Test Center</option>
                <option value="Center A">Center A</option>
                <option value="Center B">Center B</option>
              </Field>
              <ErrorMessage
                name="testCenter"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <Field
                name="gender"
                as="select"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* How Did You Hear About Us */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                How Did You Hear About Us?
              </label>
              <Field
                name="heardFrom"
                type="text"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="heardFrom"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Province */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Province
              </label>
              <Field
                name="province"
                as="select"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Province</option>
                <option value="Sindh">Sindh</option>
                <option value="Punjab">Punjab</option>
                <option value="KPK">KPK</option>
              </Field>
              <ErrorMessage
                name="province"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <Field
                name="address"
                type="text"
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Picture Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload Picture
              </label>
              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={(e) => setFieldValue("picture", e.target.files[0])}
                className="mt-1 p-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <ErrorMessage
                name="picture"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GeneralInfo;
