import React, { useState } from 'react';
import { radioMap } from '../constants';

const MapRadioButtons = () => {
    const [selectedOption, setSelectedOption] = useState('');
    


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="flex justify-start items-center p-2">
            
            <div className=" p-8w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center">Choose an Option</h2>
                {radioMap.map((option) => (
                    <div key={option.id} className="flex items-center mb-4">
                        <input
                            type="radio"
                            id={option.id}
                            name="options"
                            value={option.value}
                            checked={selectedOption === option.value}
                            onChange={handleOptionChange}
                            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label htmlFor={option.id} className="ml-2 block text-sm text-gray-900">
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapRadioButtons;