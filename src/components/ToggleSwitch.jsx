import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import map pin icon

const ToggleSwitch = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        const newState = !isToggled;
        setIsToggled(newState);
        if (onToggle) {
            onToggle(newState ? 0 : 1); // Send toggle state to parent
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-3 rounded-lg transition duration-200 flex items-center justify-center ${
                isToggled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            } hover:${isToggled ? 'bg-blue-400' : 'bg-gray-400'}`}
            title={isToggled ? 'Disable Pins' : 'Enable Pins'}
        >
            <FaMapMarkerAlt className="text-2xl" /> {/* Pin icon */}
        </button>
    );
};

export default ToggleSwitch;
