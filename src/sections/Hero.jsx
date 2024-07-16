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
        <div className="relative overflow-hidden ">
            <div className="inset-0 justify-end items-end">
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
            <motion.div variants={fadeIn("left", "spring")}>
                <div className="relative px-16 py-12 flex-1 sm:w-[350px] sm:min-w-[350px] flex flex-col justify-center items-center w-full max-xl:padding-x mt-32">
                    <div className=" bg-slate-600 bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg p-8 mx-auto max-w-lg shadow-xl">
                        <h1 className="  font-monstercat text-8xl max-sm:text-[72px] max-sm:leading">
                            <span className=" text-[#00309e] drop-shadow font-bold">CORELINE</span>
                        </h1>
                        <p className="px-2 font-poppins text-white drop-shadow font-bold text-[32px] max-sm:text-[16px] max-sm:leading">
                            Engineering Solutions
                        </p>
                        <p className="p-2 font-montserrat text-white text-lg leading-7">
                            At Coreline Engineering Solutions, we excel in delivering innovative design services that redefine the telecommunications landscape. Based in South Africa, our diverse perspective drives global connectivity, connecting communities and businesses worldwide. As industry leaders, we consistently pioneer cutting-edge solutions, fostering growth and connectivity. Join us on our mission to build a connected future without limits.
                        </p>
                        <Button label="Contact us" iconURL={arrowRight} />
                        <div className="flex justify-center items-start flex-wrap w-full mt-16 gap-16">
                            <ProgressCardHelp />
                             <ProgressCardCable />
                            <ProgressCardHouse />
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default Hero;