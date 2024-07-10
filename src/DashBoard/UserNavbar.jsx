import React, { useState } from 'react';
import { ces} from '../assets/images';
import { Signout } from '../assets/icons';
import { useNavigate } from 'react-router-dom';
import { MapToolbar } from '../components';


const UserNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSignOut = (e) => {
        e.stopPropagation();
        // Perform any necessary sign-out logic here (e.g., clearing authentication tokens)
        // Navigate to the login page
        navigate('/Login');
    };

    return (
        <nav className=" text-white shadow-md relative">
            <div className="mx-auto px-16 py-4 flex justify-between items-center ">

                {/* Brand/Logo */}
                <div className="text-lg font-semibold flex items-center space-x-2">
                    <img
                        className="drop-shadow-xl"
                        src={ces}
                        alt="Logo"
                        width={60}
                    />
                    <a href="#" className="text-black hover:text-gray-300">
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
                        <span className="text-xl font-semibold text-white">FD</span>
                    </div>
                    <div
                        className="text-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <div className="text-xl text-black font-semibold">Fritz</div>
                        <div className="text-lg text-black ">Derick</div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute z-50 top-full mt-2 w-48 bg-[#646467] border border-gray-200 rounded-md shadow-lg">
                            <ul>
                                <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">View Profile</li>
                                <li className="px-4 py-2 hover:bg-blue-500 cursor-pointer">Account Settings</li>
                                <li onClick={handleSignOut} className="px-4 py-2 hover:bg-red-500 cursor-pointer flex flex-row gap-2">                        
                                    <img
                                    className="drop-shadow-xl"
                                    src={Signout}
                                    alt="Signout"
                                    width={20}
                                />Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
