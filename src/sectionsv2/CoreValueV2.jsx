import React, { useState } from 'react';
import { CESCanvas } from '../canvas';
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from '../hoc';
import { coreValues } from '../constants';
import { Core } from '../assets/images';
import { AnimatePresence, motion } from 'framer-motion';

const CoreValueV2 = () => {
    const [hoveredValue, setHoveredValue] = useState(null);

    return (
        <section id="section1" className="flex flex-col items-center px-4 py-8 mb-6">
            {/* Text Content */}
            <motion.div variants={fadeIn("right", "spring")} className="w-full p-4 text-center">
                <div className="bg-gradient-to-b rounded-2xl py-4 px-6">
                    <h3 className="font-palanquin text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl  font-bold max-w-3xl  mx-auto">
                        <span className="text-[#00309e]">Guiding Principles for a Connected Future</span>
                    </h3>
                    <p className="text-center mt-4 m-auto info-text max-w-4xl text-lg lg:text-xl xl:text-2xl 2xl:text-2xl">
                        At Coreline Engineering Solutions, we focus on empowering a connected future through innovation,
                        sustainability, and exceptional engineering expertise. Our core values guide us in building resilient
                        networks and impactful solutions.
                    </p>
                </div>
            </motion.div>

            {/* Container for Core Values and CES Canvas */}
            <div className="flex flex-col lg:flex-row w-full justify-between items-start gap-6">
                {/* CES Canvas with Background Image */}
                <div className="relative w-full lg:w-1/2 flex items-center justify-center rounded-lg overflow-hidden">
                    <div className="relative z-10 rounded-lg shadow-lg opacity-90 w-full h-full flex items-center justify-center">
                        <div className="w-[250px] h-[350px] sm:w-[300px] sm:h-[400px] md:w-[450px] md:h-[550px] lg:w-[500px] lg:h-[600px] xl:w-[600px] xl:h-[700px] 2xl:w-[700px] 2xl:h-[800px] rounded-lg 2xl:rounded-2xl flex items-center justify-center overflow-hidden">
                            <motion.img
                                src={hoveredValue || Core}
                                alt={hoveredValue ? "Core Value Image" : "Default Core Image"}
                                className="rounded-lg object-cover w-full h-full"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                key={hoveredValue || "default-core-image"}
                            />
                        </div>
                    </div>
                </div>


                {/* Core Values Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full lg:w-1/2">
                    {coreValues.slice(0, 4).map((value, index) => (
                        <div
                            key={index}
                            className="bg-[#00309e] text-white p-6 lg:p-8 2xl:p-16 rounded-lg shadow-lg flex flex-col items-center hover:scale-105 hover:bg-gradient-to-t from-[#00309e] via-blue-400 to-blue-300 duration-300 cursor-pointer"
                            onMouseEnter={() => setHoveredValue(value.imgref)}
                            onMouseLeave={() => setHoveredValue(null)}
                        >
                            {/* Icon on the left side */}
                            <img
                                src={value.svgref}
                                alt={`${value.title} icon`}
                                className="w-16 h-16 lg:w-20 2xl:w-24 lg:h-20 2xl:h-24 border-2 border-white rounded-full p-2 lg:mr-4 mb-4 lg:mb-0"
                            />
                            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                                <h4 className="text-lg lg:text-xl 2xl:text-2xl font-bold">{value.title}</h4>
                                <p className="text-sm lg:text-base 2xl:text-lg mt-2 break-words">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionWrapper(CoreValueV2, "about");
