import React from 'react'

const ServiceCard = ({ imgURL, label, subtext }) => {
    return (
      <div className=' z-50 flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl drop-shadow-sm px-10 py-16 transform bg-white transition duration-500 hover:scale-110 hover:bg-gradient-to-t from-[#00309e] via-blue-400 to-blue-300 hover:text-white' >
        <div className='w-15 h-11 flex justify-center items-center  rounded-full'>
          <img src={imgURL} alt={label} width={70} height={70} />
        </div>
        <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
          {label}
        </h3>
        <p className='break-words mt-4 m-auto font-montserrat text-lg leading-normal '>
          {subtext}
        </p>
      </div>
    );
  };
  
  export default ServiceCard;