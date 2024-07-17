import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapTileDropdown from './MapTileDropdown';
import { TILE_LAYERS } from '../sections/map_tile_provider';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


// Dropdown component that handles its open/close state based on props
const Dropdown = ({ label, isOpen, onToggle, children }) => {
    return (
        <div className="relative inline-block">
            <button
                onClick={onToggle}
                className="mr-4 p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl"
            >
                {label}
            </button>
            {isOpen && (
                <div className="absolute bg-white shadow-md rounded mt-2 w-48 z-50">
                    {children}
                </div>
            )}
        </div>
    );
};

const MapToolbar = ({ onShowLocation ,onTileLayerChange }) => {
    // State to track which dropdown is open, by label
    const [openDropdown, setOpenDropdown] = useState(null);

    // Function to handle opening/closing of dropdowns
    const toggleDropdown = (label) => {
        if (openDropdown === label) {
            setOpenDropdown(null); // Close if the same dropdown is clicked
        } else {
            setOpenDropdown(label); // Open the new dropdown
        }
    };

    return (
        <nav className="bg-blue-900 p-4 flex items-center justify-between gap-10 z-50 relative">
            <div className="text-white text-lg font-semibold">Narrative Mapping Tool</div>
            <div className="space-x-6">
                <ul className="flex space-x-4">

                    {/* Add MapTileDropdown here */}
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
                                        onClick={() => onTileLayerChange(TILE_LAYERS[layerKey])}
                                        className="w-full text-left p-2 hover:bg-gray-200"
                                    >
                                       <div>
                                       {layerKey}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Dropdown>
                    </li>
                    <li className="p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl">
                        <Link to='/'>Home</Link>
                    </li>
                    <li className="p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl">
                        <Link to='/DashBoard'>DashBoard</Link>
                    </li>
                    <li onClick={(onShowLocation)} className="p-4 hover:bg-[#6d7eff] hover:duration-300 text-white rounded-2xl">
                        Locate Me
                    </li>
                     {/* Add more Dropdown components similarly */}
                </ul>
            </div>
        </nav>
    );
};

export default MapToolbar;
