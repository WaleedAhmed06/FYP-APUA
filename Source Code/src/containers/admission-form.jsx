import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/green-logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const programs = [
  {
    value: "BS Computer Science",
    label:
      "BS Computer Science (minimum 50% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Software Engineering",
    label:
      "BS Software Engineering (minimum 50% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Artificial Intelligence",
    label:
      "BS Artificial Intelligence (minimum 50% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Food Science and Technology",
    label:
      "BS Food Science and Technology (minimum 50% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Biotechnology",
    label:
      "BS Biotechnology (minimum 50% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Digital Systems and Web Technology",
    label:
      "BS Digital Systems and Web Technology (minimum 45% in intermediate - Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Digital Forensics and Cyber Security",
    label:
      "BS Digital Forensics and Cyber Security (minimum 45% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Cloud Applications Development and Operations",
    label:
      "BS Cloud Applications Development and Operations (minimum 45% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Robotics and Intelligent Systems",
    label:
      "BS Robotics and Intelligent Systems (minimum 45% in intermediate - Pre-Eng/ DAE/A-Level)",
  },
  {
    value: "BS Microbiology",
    label: "BS Microbiology (minimum 45% in intermediate - Pre-Med)",
  },
  {
    value: "BE Electrical",
    label:
      "BE Electrical (minimum 60% in intermediate - Pre-Med, Pre-Eng/ DAE/A-Level)",
  },
];

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  fatherName: Yup.string().required("Father's name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password"),
  programType: Yup.string().required("Program type is required"),
  program: Yup.string().required("Select a program"),
  campus: Yup.string().required("Select a campus"),
  phoneNo: Yup.string()
    .matches(/^\d{11}$/, "Cell number must be 11 digits")
    .required("Cell number is required"),
  location: Yup.string().required("Select a location"),
});

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [programPreference, setProgramPreference] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      fatherName: "",
      email: "",
      password: "",
      confirmPassword: "",
      programType: "",
      program: "",
      campus: "",
      phoneNo: "",
      location: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        programPreference,
      };

      try {
        const res = await axios.post("http://localhost:3000/api/auth/register", payload); // axios.defaults.withCredentials = true;
        alert(res.data.msg);
        navigate("/student-form");
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration Failed");
      }
    },
  });

  const handleProgramSelect = (e) => {
    const value = e.target.value;
    if (value && !programPreference.includes(value)) {
      setProgramPreference([...programPreference, value]);
    }
  };

  const removePreference = (item) => {
    setProgramPreference(programPreference.filter((i) => i !== item));
  };

  return (
    <div className="flex lg:flex-row flex-col-reverse">
      {/* Left Side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center bg-gray-100">
        <form onSubmit={formik.handleSubmit} className="w-[90%] mx-auto p-4">
          <div className="text-center">
            <h2 className="text-[20px] font-bold">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-black text-xl pr-2"
              />
              Welcome to Hamdard University Admissions for
            </h2>
            <h3 className="text-xl font-bold text-red-800">Fall-2024</h3>
            <hr className="my-2" />
            <h3 className="text-xl font-bold text-red-800">Admission Portal</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="karachi"
                  onChange={formik.handleChange}
                  checked={formik.values.location === "karachi"}
                  className="mr-2"
                />
                Karachi
              </label>
              <label className="inline-flex items-center ml-5">
                <input
                  type="radio"
                  name="location"
                  value="islamabad"
                  onChange={formik.handleChange}
                  checked={formik.values.location === "islamabad"}
                  className="mr-2"
                />
                Islamabad
              </label>
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-600 text-sm">
                  {formik.errors.location}
                </div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <input
                type="text"
                name="fatherName"
                placeholder="Enter Father's Name"
                value={formik.values.fatherName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full"
              />
              {formik.touched.fatherName && formik.errors.fatherName && (
                <div className="text-red-600 text-sm">
                  {formik.errors.fatherName}
                </div>
              )}

              <input
                type="password"
                name="password"
                placeholder="Enter New Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full mt-4"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm">
                  {formik.errors.email}
                </div>
              )}

              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full mt-4"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-600 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>

            <div>
              <input
                type="text"
                name="phoneNo"
                placeholder="Enter Cell No"
                value={formik.values.phoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full"
              />
              {formik.touched.phoneNo && formik.errors.phoneNo && (
                <div className="text-red-600 text-sm">
                  {formik.errors.phoneNo}
                </div>
              )}

              <select
                name="program"
                value={formik.values.program}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full mt-4"
              >
                <option value="">Select Program</option>
                <option value="bsc">BSc</option>
                <option value="msc">MSc</option>
                <option value="mba">MBA</option>
              </select>
              {formik.touched.program && formik.errors.program && (
                <div className="text-red-600 text-sm">
                  {formik.errors.program}
                </div>
              )}
            </div>

            <div>
              <select
                name="programType"
                value={formik.values.programType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full"
              >
                <option value="">Select Program Type</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
              </select>
              {formik.touched.programType && formik.errors.programType && (
                <div className="text-red-600 text-sm">
                  {formik.errors.programType}
                </div>
              )}

              <select
                name="campus"
                value={formik.values.campus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border rounded p-3 w-full mt-4"
              >
                <option value="">Select Campus</option>
                <option value="karachi">Karachi</option>
                <option value="lahore">Lahore</option>
                <option value="islamabad">Islamabad</option>
              </select>
              {formik.touched.campus && formik.errors.campus && (
                <div className="text-red-600 text-sm">
                  {formik.errors.campus}
                </div>
              )}
            </div>
          </div>

          {/* Program Preferences */}
          <select
            onChange={handleProgramSelect}
            className="border rounded p-3 w-full mt-4"
          >
            <option value="">Select Other Program Preference (Optional)</option>
            {programs.map((program, index) => (
              <option key={index} value={program.value}>
                {program.label}
              </option>
            ))}
          </select>

          {programPreference.map((item, index) => (
            <div
              key={index}
              className="flex items-center my-2 border border-gray-500"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="px-1 cursor-pointer"
                onClick={() => removePreference(item)}
              />
              <h3 className="border-l-2 border-gray-400 px-2">{item}</h3>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 bg-green-500 text-white rounded p-3 w-full"
          >
            Register
          </button>
        </form>
      </div>

      {/* Right Side */}
      <div className="lg:w-1/2 bg-bg-registerFormImage bg-cover bg-center h-screen">
        <div className="h-screen bg-green-900 bg-opacity-55">
          <div className="flex justify-center py-20">
            <img src={logo} alt="logo" />
          </div>
          <h3 className="text-right text-white text-2xl font-bold px-6">
            "WE BELIEVE THAT EDUCATION IS FOR EVERYONE"
          </h3>
          <h3 className="text-right text-white text-2xl font-bold px-6">
            "Shaheed Hakeem Mohammed Said"
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;
