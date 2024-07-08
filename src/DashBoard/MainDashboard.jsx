// src/components/TaskCard.js
import React from 'react';
import { tasks } from '../constants';

const TaskCard = ({ }) => {
    return (
        <div className="flex flex-row md:flex-row border rounded overflow-hidden mb-4 shadow-sm h-auto md:h-64 relative">
            <div className="p-4 flex flex-col">
                {tasks.map((item, index) => (
                    <div key={index} className="p-2 hover:bg-gray-700 rounded-md">
                        <strong className="mb-2 text-blue-700">{item.title}</strong>
                        <h3 className="mb-0">{item.subtitle}</h3>
                        <div className="mb-1 text-gray-500">{item.description}</div>
                        <p className="mb-auto">{item.description}</p>
                    </div>
                ))}
            </div>
            {/* {imageSrc ? (
                <div className="flex-none w-full md:w-48">
                    <img
                        className="object-cover w-full h-full"
                        src={imageSrc}
                        alt={imageAlt}
                    />
                </div>
            ) : (
                <div className="flex-none w-full md:w-48 bg-gray-600 flex items-center justify-center">
                    <svg
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        viewBox="0 0 200 250"
                    >
                        <title>Placeholder</title>
                        <rect width="100%" height="100%" fill="#55595c"></rect>
                        <text x="50%" y="50%" fill="#eceeef" dy=".3em" textAnchor="middle">
                            Thumbnail
                        </text>
                    </svg>
                </div>
            )} */}
        </div>
    );
};

export default TaskCard;
