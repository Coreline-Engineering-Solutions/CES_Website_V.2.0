import React, { useState } from 'react';
import { ces,CESLogoWhite } from '../assets/images';
import { Signout } from '../assets/icons';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserNavbar = ({ _USERNAME }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const username = _USERNAME;

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = (e) => {
        e.stopPropagation();
        // Clear the username cookie
        Cookies.remove('username');
        // Navigate to the login page
        navigate('/Login');
    };

    return (
        <nav className="text-white shadow-md relative bg-gradient-to-tr from-blue-800 via-blue-300 to-slate-50 hover:text-white">
            <div className="mx-auto px-16 py-4 flex justify-between items-center">
                {/* Brand/Logo */}
                <div className="text-lg font-semibold flex items-center space-x-2">
                    <img className="drop-shadow-xl" src={CESLogoWhite} alt="Logo" width={60} />
                    <a href="#" className="text-white hover:text-gray-300">
                        CoreLine Solutions Dashboard
                    </a>
                </div>

                {/* User Profile */}
                <div className="relative flex items-between space-x-4">
                    <div
                        className="w-14 h-14 bg-blue-900 rounded-full flex items-center justify-center overflow-hidden cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        {/* Placeholder for user image */}
                        <span className="text-xl font-semibold text-white">AD</span>
                    </div>
                    <div className="text-center cursor-pointer" onClick={toggleDropdown}>
                        <div className="text-xl text-black font-semibold">User:</div>
                        <div className="text-lg text-black ">{username}</div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute z-50 top-full mt-2 w-48 bg-blue-900 border border-gray-200 rounded-md shadow-lg">
                            <ul>
                                <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">View Profile</li>
                                <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">Account Settings</li>
                                <li onClick={handleSignOut} className="px-4 py-2 hover:bg-red-500 cursor-pointer flex flex-row gap-2">
                                    <img className="drop-shadow-xl" src={Signout} alt="Signout" width={20} />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
