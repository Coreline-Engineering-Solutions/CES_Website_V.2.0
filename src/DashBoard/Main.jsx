import React from 'react'
import ToolButtons from './ToolButtons';
import { DashboardServices } from '../constants';
import { Loginbg } from '../assets/images';



const Main = ({ isMinimized }) => {
    return (
        <div className="flex-1 border-gray-700 w-screen h-screen py-12 transition-all duration-300" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="max-container flex flex-wrap justify-center gap-9">
            {DashboardServices.map((tools, index) => (
                <ToolButtons key={tools.label} index={index} {...tools} />
            ))}
            </div>
        </div>

        
    );
};

export default Main;