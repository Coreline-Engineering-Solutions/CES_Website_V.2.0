import React from "react";
import {
	VerticalTimeline,
	VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { experiences, ServiceCarousel } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { herobg } from "../assets/images";

const ExperienceCard = ({ experience }) => {
	return (
		<VerticalTimelineElement
			
			contentStyle={{
				background: "#00309e",
				color: "#fff",
			}}
			contentArrowStyle={{ borderRight: "7px solid  #bg-black " }}
			icon={
				
				<div className='flex justify-center items-center w-full h-full '>
					<img
						src={experience.icon}
						className='w-[100%] h-[100%] object-contain '
					/>
				</div>
			}
		>
			<div>
				<h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
				<p
					className='text-secondary text-[16px] font-semibold'
					style={{ margin: 0 }}
				>
				</p>
			</div>

			<ul className='mt-5 list-disc ml-5 space-y-2'>
				{experience.points.map((point, index) => (
					<li
						key={`experience-point-${index}`}
						className='text-black-100 text-[14px] pl-1 tracking-wider'
					>
						{point}
					</li>
				))}
			</ul>
		</VerticalTimelineElement>
	);
};

const Experience = () => {
	return (
		<>
			<motion.div variants={textVariant()}>

			<h3 id="client" className="font-palanquin mx-auto text-center text-4xl font-bold max-w-3xl">
				Client
				<span className="text-[#00309e] font-bold"> Overview </span>
			</h3>
				<p className={`text-center mt-4 m-auto info-text max-w-4xl`}>
					Coreline Engineering Solutions, we're dedicated to revolutionizing the telecommunications landscape with our innovative services. From designing robust infrastructure to optimizing network performance, we offer a comprehensive suite of solutions tailored to meet the evolving needs of our clients. Our expertise encompasses:
				</p>
			</motion.div>

			<div className={`mt-20 flex flex-col rounded-xl bg-opacity-45 shadow-full`}
			      style={{
					backgroundImage: `url(${herobg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				  }}>
				<VerticalTimeline>
					{experiences.map((experience, index) => (
						<ExperienceCard
							key={`experience-${index}`}
							experience={experience}
						/>
					))}
				</VerticalTimeline>
			</div>
		</>
	);
};

export default SectionWrapper(Experience, "work");