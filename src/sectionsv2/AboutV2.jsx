import React from 'react';
import Button from '../components/Button';
import { CESCanvas } from '../canvas';
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/motion";
import { SectionWrapper } from '../hoc';
import { narrative } from '../assets/icons';

const AboutV2 = () => {
    const openPDF = () => {
        window.open('/CES.pdf', '_blank');
    };

    return (
        <section id="section1" className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-20 xl:gap-12 2xl:gap-20 w-full p-4 2xl:p-24 ">

            <motion.div
                variants={fadeIn("right", "spring")}
                className="w-full lg:w-[60%] xl:w-[65%] 2xl:w-[70%] mb-10 lg:mb-0"
            >
                <div className="flex flex-col space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12 p-12">

                    <div className="rounded-2xl p-4 lg:p-6 xl:p-8 2xl:p-">
                        <h2 className="font-palanquin text-white text-4xl bg-slate-500 bg-opacity-45 shadow-white shadow-2xl xl:p-8 2xl:p-10  rounded-2xl  p-4 lg:text-5xl xl:text-6xl 2xl:text-7xl capitalize font-bold drop-shadow">
                            Mapping Tomorrow's Connections Today
                        </h2>
                    </div>

                    <p className="p-4 lg:p-6 xl:p-8 2xl:p-10 mt-4 font-montserrat bg-slate-500 bg-opacity-45 shadow-white shadow-2xl text-white  font-semibold rounded-2xl text-md lg:text-lg xl:text-xl 2xl:text-xl leading-7 lg:leading-8 xl:leading-9 2xl:leading-10">
                        At Coreline Engineering Solutions, our commitment to excellence shines through our innovative telecommunications design services, setting new industry standards. Based in South Africa, we approach global challenges with a local perspective, creating solutions that connect communities and empower businesses worldwide.

                        Our expertise spans resilient, sustainable infrastructure that meets the highest quality standards, whether for urban centers or remote areas. By bridging digital divides, we strive to make a lasting impact, fostering growth, connectivity, and a more connected future for all.					</p>

                    <div className="mt-8 lg:mt-12 xl:mt-16 2xl:mt-20">
                        <button className="px-6 rounded-full hover:shadow-blue-400 shadow-lg hover:font-bold hover:text-lg hover:text-white hover:bg-blue-600 bg-[#00309e] text-white font-bold transition transform lg:px-8 py-3 lg:py-4 xl:py-5 2xl:py-6 hover:scale-105">
                            Get in Touch
                        </button>
                    </div>

                </div>
            </motion.div>

            <div className="relative flex items-center flex-col bg- flex-1 justify-center drop-shadow-xl rounded-lg p-4 lg:p-8 xl:p-12 2xl:p-4">
                <div className="w-[200px] sm:w-[300px] md:w-[250px] lg:w-[300px] xl:w-[550px]  h-[2000px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[550px] 2xl:w-[580px] flex items-center justify-center">
                    <CESCanvas />
                </div>
                <h2 className="text-black text-center capitalize  drop-shadow-lg p-4 lg:p-6 xl:p-8 2xl:p-8 rounded-lg mt-4 lg:mt-6 xl:mt-8 2xl:mt-10  font-bold lg:max-w-lg">
                    <span className="font-bold font-arial text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl underline decoration-4 text-[#00309e] drop-shadow">CORELINE</span><br />
                    <span className="font-bold font-arial text-sm sm:text-md lg:text-lg xl:text-xl 2xl:text-2xl text-[#646467] drop-shadow">ENGINEERING SOLUTIONS (PTY) LTD</span>
                </h2>
            </div>
        </section>
    );
};

export default SectionWrapper(AboutV2, "about");
