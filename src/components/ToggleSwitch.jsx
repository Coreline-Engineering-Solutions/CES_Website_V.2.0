import React, { useState } from 'react';

const ToggleSwitch = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        const newState = !isToggled;
        setIsToggled(newState);
        if (onToggle) {
            // Send 1 if toggled on, 0 if toggled off
            onToggle(newState ? 1 : 0);
        }
    };

    return (
        <div className="flex items-center">
            <label className="mr-4 text-white">Toggle Pin</label>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isToggled}
                        onChange={handleToggle}
                    />
                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div
                        className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${
                            isToggled ? 'transform translate-x-full bg-blue-500' : ''
                        }`}
                    ></div>
                </div>
                <span className="ml-3 text-white">
                    {isToggled ? 'On' : 'Off'}
                </span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
