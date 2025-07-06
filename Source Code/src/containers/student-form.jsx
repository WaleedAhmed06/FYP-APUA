import React, { useState } from 'react';
import GeneralInfo from '../components/GeneralInfo';
import ProgramPreferences from '../components/ProgramPreferences';
import QualificationInfo from '../components/QualificationInfo';
import VoucherDetail from '../components/VoucherDetail';
import ChangePassword from '../components/ChangePassword';

const StudentForm = () => {
  const [activeTab, setActiveTab] = useState('GeneralInfo');

  const renderContent = () => {
    switch (activeTab) {
      case 'GeneralInfo':
        return <GeneralInfo />;
      case 'ProgramPreferences':
        return <ProgramPreferences />;
      case 'QualificationInfo':
        return <QualificationInfo />;
      case 'VoucherDetail':
        return <VoucherDetail />;
      case 'ChangePassword':
        return <ChangePassword />;
      default:
        return <GeneralInfo />;
    }
  };

  return (
    <div className="container w-[90%] mx-auto p-4">
      {/* Heading and Breadcrumbs */}
      <div className="flex justify-between items-center mb-4 bg-green-200 p-3 rounded-lg">
        <h1 className="text-xl">Edit Admission Form</h1>
        <div className="text-sm text-gray-600">
          <span>Home</span> &gt; <span>Online Admission Form</span> &gt; <span className='text-green-800 font-bold'>Edit Applicent Form</span>
        </div>
      </div>

      <h2 className='text-2xl font-semibold mt-6 mb-3'>Online Admission Forms</h2>

      {/* Tabs Section */}
      <div className="flex space-x-4 border-b">
        {['General Info', 'Program Preferences', 'Qualification Info', 'Voucher Detail', 'Change Password'].map((tab, index) => (
          <button
            key={index}
            className={`pb-2 text-sm font-semibold ${
              activeTab === tab.replace(' ', '') ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.replace(' ', ''))}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default StudentForm;
