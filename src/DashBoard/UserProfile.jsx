import React, { useState } from 'react';

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative p-4 flex flex-col justify-center items-center">
      <div className="w-16 h-16 bg-[#646467] rounded-full flex items-center justify-center overflow-hidden cursor-pointer" onClick={toggleDropdown}>
        {/* Placeholder for user image */}
        <span className="text-xl font-semibold text-white">FD</span>
      </div>
      <div className="mt-4 text-center cursor-pointer" onClick={toggleDropdown}>
        <div className="text-lg font-semibold">Fritz</div>
        <div className="text-sm">Derick</div>
      </div>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={toggleDropdown}
        >
          Edit Profile
        </button>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
