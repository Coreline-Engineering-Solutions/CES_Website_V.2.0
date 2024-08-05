import React from 'react'
import { useNavigate } from 'react-router-dom';

const ToolButtons = ({_USERNAME,icon, label, description,path,ind}) => {

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        if (ind !== 0) {
            navigate(path, { state: { username: _USERNAME } });
        }
    };

    return (
        <div
            onClick={() => handleNavigation(path)}
            className={`w-[350px] h-[250px] text-white border-double drop-shadow flex flex-col items-center justify-between rounded-[20px] shadow-3xl px-10 py-8 transform transition duration-200 ${ind === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-900 hover:scale-110 hover:bg-gradient-to-tr from-blue-900 via-blue-500 to-slate-50 hover:text-white'}`}
        >
            <div className='w-15 h-11 flex justify-center items-center rounded-full'>
                <img src={icon} alt={label} width={70} height={70} />
            </div>
            <h3 className='mt-5 border-b-2 bor font-palanquin text-2xl leading-normal font-bold'>
                {label}
            </h3>
            <p className='mt-3 break-words font-boldw text-center font-montserrat text-lg leading-normal '>
                {description}
            </p>
        </div>
    );

};

export default ToolButtons