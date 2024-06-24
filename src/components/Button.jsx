import React from 'react'

const Button = ({onClick,label, iconURL}) => {
  return (
    <button className="flex  hover:bg-[#6d7eff] justify-center items-center gap-2 bg-[#00309e] text-white m-2 px-4 py-3 m- rounded-full"  onClick={onClick}>{label}
    <img src={iconURL} alt="arrow right icon" className="ml-2 rounded-full w-8 h-8" />
    
    </button>
    
  )
}

export default Button