import React, { useState, useEffect } from 'react';
import { arrowRight } from '../assets/icons';
import { statistics } from '../constants';
import { CESphoto1, CESphoto2, CESphoto3, CESbuilding, CESteam } from '../assets/images';
import Button from '../components/Button';
import { ProgressCardHelp, ProgressCardCable, ProgressCardHouse } from '../components';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from '../hoc';

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [CESphoto1, CESphoto2, CESbuilding, CESteam];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 10000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden pt-20 ">
            <div className="justify-end items-end">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className={`h-screen w-screen object-cover absolute transition-opacity rounded-r-lg duration-1000 ease-in-out ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        src={image}
                        alt={`Image ${index + 1}`}
                        style={{
                            backgroundImage: `url(${image})`,
                            maskImage: 'linear-gradient(to top, transparent, black)',
                            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        }}
                    />
                ))}
            </div>
            <motion.div variants={fadeIn("top", "spring")}>
    <div className="relative px-4 flex-1 sm:w-[350px] sm:min-w-[350px] flex flex-col justify-center items-center w-full mt-16">
        <div className="bg-slate-600 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg p-8 mx-auto max-w-lg shadow-xl text-center">
            <h1 className="font-monstercat text-6xl max-sm:text-[48px] max-sm:leading mb-4">
                <span className="text-[#00309e] drop-shadow font-bold">
                    "Mapping the Future of Connectivity"
                </span>
            </h1>
            <p className="px-2 font-poppins text-white drop-shadow font-bold text-[24px] max-sm:text-[16px] max-sm:leading mb-6">
                Fiber Network Solutions
            </p>
            <p className="p-2 font-montserrat text-white text-lg leading-7">
                We specialize in detailed fiber mapping solutions for clients preparing for field surveys. Our team provides comprehensive design services that streamline project planning, helping you visualize and connect communities with precision and innovation.
            </p>
            <a href="#contact" className="flex hover:bg-[#6d7eff] justify-center items-center gap-2 bg-[#00309e] text-white m-2 px-4 py-3 rounded-full">
                Contact Us
                <img src={arrowRight} alt="arrow right icon" className="ml-2 rounded-full w-8 h-8" />
            </a>
        </div>
    </div>
</motion.div>


        </div>
    );
};

export default Hero;