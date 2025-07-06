import React from "react";

const ProgramPreferences = () => {
  return (
    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Program Preferences</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Campus */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Campus
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>North Nazimabad KDA Campus</option>
            <option>Gulshan Campus</option>
            <option>City Campus</option>
          </select>
        </div>

        {/* Faculty */}
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Faculty
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>Faculty of Engineering</option>
            <option>Faculty of Business</option>
            <option>Faculty of Arts</option>
          </select>
        </div>

        {/* 1st Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            1st Preference (Value Required)
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>BS (RIS)</option>
            <option>BS (CS)</option>
            <option>BS (SE)</option>
          </select>
        </div>

        {/* 2nd Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            2nd Preference
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>BS (DFCS)</option>
            <option>BS (AI)</option>
            <option>BS (IT)</option>
          </select>
        </div>

        {/* 3rd Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            3rd Preference
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>BS (RIS)</option>
            <option>BS (CS)</option>
            <option>BS (SE)</option>
          </select>
        </div>

        {/* 4th Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            4th Preference
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>MSCS (SE)</option>
            <option>MSCS (AI)</option>
            <option>MSCS (IT)</option>
          </select>
        </div>

        {/* 5th Preference */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            5th Preference
          </label>
          <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option>MSCS</option>
            <option>PhD (CS)</option>
            <option>PhD (IT)</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramPreferences;
