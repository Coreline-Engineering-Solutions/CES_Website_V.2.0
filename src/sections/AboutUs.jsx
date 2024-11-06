import React from 'react';
import Button from '../components/Button';
import { arrowRight } from '../assets/icons';
import { ces } from '../assets/images';
import { CESCanvas } from '../canvas';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from '../hoc';

const AboutUs = () => {

	const openPDF = () => {
		window.open('/CES.pdf', '_blank');
	};
	return (
		<section id="section1" className="flex justify-center max-lg:flex-col gap-14 w-full max-container">

			<motion.div variants={fadeIn("right", "spring")}>
				<div className="flex flex-col flex-1 p-4">

					<div className=" rounded-2xl p-2 bg-[#00309e] bg-opacity-45 border-[#00309e] border-2">
						<h2 className="font-palanquin text-white z-10  text-4xl capitalize font-bold lg:max-w-lg">
							<span className=" drop-shadow font-bold">Mapping Tomorrow's Connections Today </span>
						</h2>
					</div>
					<p className="p-4 mt-4 font-montserrat  shadow-xl bg-[#00309e] bg-opacity-45 rounded-2xl border-[#00309e] border-2 text-white font-bold  drop-shadow text-lg z-50 leading-7">
						At Coreline Engineering Solutions, our commitment to excellence is highlighted by our expert design services that set industry benchmarks and drive innovation in telecommunications. Based in South Africa, we bring a unique perspective to global challenges, creating solutions that connect local communities and international businesses, fostering growth and connectivity. Our legacy positions us as industry leaders in delivering cutting-edge solutions that advance telecommunications. We invite you to engage with our team, explore collaborative opportunities, and join us in building a connected future where innovation thrives and communities benefit from seamless connectivity.					</p>
					<div className="mt-11">
						<button className="px-6 py-3 rounded-full hover:shadow-blue-400 shadow-lg border-white bg-[#00309e] hover:bg-blue-600 text-white font-bold transition transform hover:scale-105">
							Get in Touch
						</button>
					</div>

				</div>

			</motion.div>

			<div className="relative items-center flex flex-1 flex-col  justify-center drop-shadow-xl rounded-lg p-4">
				<div className="w-[500px] h-[500px] bg-white  rounded-full border-[#00309e] border-2">
					<CESCanvas />
				</div>
				<h2 className="text-black text-center capitalize bg-white  drop-shadow-lg p-2 rounded-lg mt-2  border-[#00309e] border-2 font-bold lg:max-w-lg">
					<span className="font-bold font-arial text-8xl text-[#00309e] drop-shadow">CORELINE</span><br />
					<span className="font-semibold font-arial text-3xl text-[#646467] drop-shadow">ENGINEERING SOLUTIONS (PTY) LTD</span>
				</h2>
			</div>
		</section>
	)

}

export default SectionWrapper(AboutUs, "about")
