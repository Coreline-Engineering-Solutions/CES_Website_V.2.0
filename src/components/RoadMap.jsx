import React, { useState } from 'react';
import { points } from '../constants';

const Roadmap = () => {
    const [hoveredPoint, setHoveredPoint] = useState(null);

    return (
        <div  className="relative flex sm: flex-col items-center max-container mb-24">
            <h2 className="font-bold items-center font-palanquin text-4xl capitalize lg:max-w-lg">
                <span className="text-[#00309e] drop-shadow font-bold">Client</span> Onboarding
            </h2>
            <p className="text-center mt-4 m-auto info-text max-w-xl mb-24">
                Get ready for a fiber experience like never before. Our client onboarding process ensures your network design is custom-fit for your needs. Seamless setup, expert training, endless possibilities. Let's unleash the power of fiber together!
            </p>

            <div className="flex  flex-col justify-start max-w-xl">
                {points.map((point, index) => (
                    <div
                        key={point.id}
                        className="relative flex-col flex items-center "
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                    >
                        <div className="w-24 h-24 bg-blue-500 rounded-full drop-shadow-full">
                            <img src={point.imgURL} alt={point.title} className="w-full h-full rounded-full transform transition duration-500 hover:scale-125" />
                        </div>
                        {hoveredPoint === point.id && (
                            <div className="relative top-full left-1/2 transform-translate-x-1/2 bg-white p-4 rounded shadow-lg w-[300px] text-center transition-opacity duration-300 opacity-100">
                                <h3 className="text-lg font-semibold">{point.title}</h3>
                                <p className="text-sm">{point.description}</p>
                            </div>
                        )}
                        <div className=" w-1  bg-gray-300 h-24"></div>
                    </div>          
                ))}
            </div>
        </div>
    );
};

export default Roadmap;