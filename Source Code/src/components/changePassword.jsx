import React, { useState } from 'react';

const ChangePassword = () => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
    } else {
      console.log('Password Changed:', passwordData);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <h2 className="text-lg font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            value={passwordData.oldPassword}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded">Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
