import React from 'react'

const ServiceCard = ({ imgURL, label, subtext }) => {
    return (
      <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 transform transition duration-500 hover:scale-125 hover:bg-gradient-to-tr from-[#00309e] via-blue-300 to-blue-50 hover:text-white'>
        <div className='w-15 h-11 flex justify-center items-center  rounded-full'>
          <img src={imgURL} alt={label} width={70} height={70} />
        </div>
        <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
          {label}
        </h3>
        <p className='mt-3 break-words font-montserrat text-lg leading-normal '>
          {subtext}
        </p>
      </div>
    );
  };
  
  export default ServiceCard;