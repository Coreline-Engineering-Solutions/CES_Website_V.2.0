import React from 'react'
import ToolButtons from './ToolButtons';
import { DashboardServices } from '../constants';
import { Loginbg } from '../assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Main = ({ isMinimized, _USERNAME}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!_USERNAME) {
            navigate('/Login'); // Redirect to the login page if _USERNAME is empty
        }
    }, [_USERNAME, navigate]);

    return (
        <div className="flex-1 border-gray-700 w-screen h-screen py-12 transition-all duration-300" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="max-container flex flex-wrap justify-center gap-9">
            {DashboardServices.map((tools, index) => (
                <ToolButtons _USERNAME={_USERNAME} key={tools.label} index={index} {...tools} />
            ))}
            </div>
        </div>

        
    );
};

export default Main;