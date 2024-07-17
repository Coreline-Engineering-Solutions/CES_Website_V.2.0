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
        
        </div>
    );
};

export default TaskCard;
