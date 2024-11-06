import React from 'react';
import { HeroV2bg2 } from '../assets/images';
import { coreValues } from '../constants';

const Hero = () => {
  return (
    <div 
      className="relative overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${HeroV2bg2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        maskImage: 'linear-gradient(to top, transparent 5%, black 30%)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"> {/* Darker overlay */}
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#00c6ff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#0072ff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-50 text-center text-white">
        <h1 className="text-4xl md:text-6xl 2xl:text-8xl font-bold leading-tight mb-4 drop-shadow-lg">
          Unleash the Power of Fiber Planning
        </h1>
        <p className="text-lg md:text-xl max-w-2xl 2xl:text-4xl 2xl:max-w-full  mx-auto mb-8 drop-shadow-lg">
          Explore, manage, and expand your network with precision. Our tools are built to scale with your needs, anywhere, anytime.
        </p>
        <div className="flex justify-center gap-4 ">
          <button className="px-6 rounded-full hover:shadow-blue-400 shadow-lg border-2 hover:font-bold hover:text-lg border-white hover:text-[#00309e] hover:bg-white bg-[#00309e] text-white font-bold transition transform lg:px-8 xl:px-10 2xl:px-12 py-3 lg:py-4 xl:py-5 2xl:py-6 hover:scale-105">
            LEARN MORE
          </button>

        </div>
      </div>
    </div>
  );
};

export default Hero;
