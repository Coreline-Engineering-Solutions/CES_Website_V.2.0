import React from 'react';
import { services } from '../constants';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const MenuBar = ({ isMinimized, toggleMenuBar }) => {
    return (
        <div className={` text-white py-4 mx-2 flex flex-col transition-all duration-300 ${isMinimized ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center rounded-t-full bg-blue-900 justify-end p-2">
                <button
                    className="focus:outline-none mr-4 rounded-full hover:bg-gray-700 p-2 "
                    onClick={toggleMenuBar}
                >
                    {isMinimized ? (
                        <FiChevronRight size={24} />
                    ) : (
                        <FiChevronLeft size={24} />
                    )}
                </button>
            </div>

            <div className="flex-1 bg-blue-900 p-4 rounded-b-full">
                {services.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center  p-3 hover:bg-gray-500 rounded-md justify-start cursor-pointer transition duration-100 "
                    >
                        {isMinimized ? (
                            <img src={item.icon} className="w-8 h-8 hover:bg-gray-500 rounded-full mr-2" alt={item.label} />
                        ) : (
                            <div className="flex flex-col items-start text-left">
                                <span className="text-sm ">{item.label}</span>
                                <span className="text-xs text-gray-400">{item.description}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuBar;
