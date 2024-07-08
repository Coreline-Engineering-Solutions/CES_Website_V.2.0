import React from 'react'

const ToolButtons = ({icon, label, description}) => {
    return (
        <div className='w-[350px] h-[250] bg-blue-900 text-white border-double drop-shadow flex flex-col items-center justify-between rounded-[20px] shadow-3xl px-10 py-8 transform transition duration-200 hover:scale-110 hover:bg-gradient-to-tr from-blue-900 via-blue-500 to-slate-50 hover:text-white'>
            <div className='w-15 h-11 flex justify-center items-center  rounded-full'>
                <img src={icon} alt={label} width={70} height={70} />
            </div>
            <h3 className='mt-5 border-b-2 bor font-palanquin text-2xl leading-normal font-bold'>
                {label}
            </h3>
            <p className='mt-3 break-words font-boldw text-center font-montserrat text-lg leading-normal '>
                {description}
            </p>
        </div>
    )
}

export default ToolButtons