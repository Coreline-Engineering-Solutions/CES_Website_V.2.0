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
				<div className="flex flex-col flex-1">

					<div className="bg-gradient-to-r from-[#00309e] to-white rounded-2xl p-2">
						<h2 className="font-palanquin text-white  text-4xl capitalize font-bold lg:max-w-lg">
							<span className=" drop-shadow font-bold">Mapping Tomorrow's Connections Today </span>
						</h2>
					</div>
					<p className="p-4 mt-4 info-text font-montserrat text-black text-lg leading-7">
						At Coreline Engineering Solutions, our commitment to excellence is underscored by our key highlights: We specialize in delivering expert design services that not only set industry benchmarks but also drive innovation within the telecommunications landscape. With our roots firmly grounded in South Africa, our unique and diverse perspective enriches our approach to global telecommunications challenges. Our solutions have a far-reaching impact, connecting local communities and international businesses alike, fostering growth and connectivity. Our legacy of success positions us as industry leaders, consistently delivering cutting-edge solutions that propel telecommunications into the future. As we invite you to engage with our team, explore collaborative opportunities, and witness the transformative impact of our forward-thinking design services, we collectively embark on the mission to build a connected future where innovation knows no bounds and communities thrive on the power of seamless connectivity.
					</p>
					<div className="mt-11">
						<Button
							onClick={openPDF}
							label="Learn More" iconURL={arrowRight} />
					</div>

				</div>

			</motion.div>

			<div className="relative items-center flex flex-1 flex-col  justify-center drop-shadow-xl" >
				<div className=" w-[600px] h-[600px]">
					<CESCanvas />
				</div>
				<h2 className=" text-black text-center capitalize font-bold lg:max-w-lg">
					<span className="font-bold font-arial text-8xl text-[#00309e] drop-shadow"> CORELINE</span><br />
					<span className="font-semibold font-arial text-3xl text-[#646467]  drop-shadow"> ENGINEERING SOLUTIONS (PY) LTD </span>
				</h2>
			</div>
		</section>
	)

}

export default SectionWrapper(AboutUs, "about")
