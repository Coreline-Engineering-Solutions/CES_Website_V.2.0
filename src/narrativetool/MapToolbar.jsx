import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TILE_LAYERS } from './map_tile_provider';
import { FiMenu } from 'react-icons/fi'; // Import hamburger icon

// Dropdown component that handles its open/close state based on props
const Dropdown = ({ label, isOpen, onToggle, children }) => {
    return (
        <div className="inline-block relative">
            <button
                onClick={onToggle}
                className="mr-4 p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl"
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute bg-white shadow-md rounded mt-2 w-48 z-50"> {/* Ensure high z-index */}
                    {children}
                </div>
            )}
        </div>
    );
};

const MapToolbar = ({ onShowLocation, onTileLayerChange, _USERNAME }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

    const toggleDropdown = (label) => {
        setOpenDropdown(openDropdown === label ? null : label); // Toggle the dropdown
    };

    const handleTileLayerChange = (layer) => {
        onTileLayerChange(layer);
        setOpenDropdown(null); // Close the dropdown
    };

    return (
        <nav className="bg-[#00309e] flex justify-between items-center px-4 py-4 z-50 fixed top-0 left-0 right-0">
            <div className="text-white text-lg font-semibold">Narrative Mapping Tool</div>
            <div className="space-x-6 flex items-center">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white"
                >
                    <FiMenu size={24} />
                </button>
                <ul className={`flex-col md:flex-row md:flex md:space-x-4 ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative bg-[#00309e] top-16 left-0 right-0 md:top-auto md:left-auto md:right-auto p-4 md:p-0`}>
                    <li className="block md:hidden p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl">
                        <Link to="/DashBoard" state={{ usernameNar: _USERNAME }}>DashBoard</Link>
                    </li>
                    <li className="block md:hidden p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl cursor-pointer" onClick={onShowLocation}>
                        Locate Me
                    </li>
                    <li className="hidden md:block p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl">
                        <Link to="/DashBoard" state={{ usernameNar: _USERNAME }}>DashBoard</Link>
                    </li>
                    <li>
                        <Dropdown
                            label="Change Map Tile"
                            isOpen={openDropdown === 'Change Map Tile'}
                            onToggle={() => toggleDropdown('Change Map Tile')}
                        >
                            <div className="p-2 flex flex-col">
                                {Object.keys(TILE_LAYERS).map(layerKey => (
                                    <button
                                        key={layerKey}
                                        onClick={() => handleTileLayerChange(TILE_LAYERS[layerKey])}
                                        className="w-full text-left p-2 hover:bg-gray-200"
                                    >
                                        {layerKey}
                                    </button>
                                ))}
                            </div>
                        </Dropdown>
                    </li>
                    <li onClick={onShowLocation} className="hidden md:block p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl cursor-pointer">
                        Locate Me
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MapToolbar;
