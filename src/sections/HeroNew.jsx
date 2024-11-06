import React from 'react';
import { CESCanvas } from '../canvas';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';

const HeroNew = () => {

	// List of keywords to display around the CESCanvas
	const keywords = [
		"Innovation",
		"Telecommunications",
		"Connectivity",
		"Global Impact",
		"Expert Design",
		"Excellence",
		"Growth",
		"Leadership",
		"Future-Proof",
	];

	// Function to calculate the circular position
	const calculatePosition = (index, total, radius) => {
		const angle = (index / total) * 2 * Math.PI; // Angle in radians
		const x = 50 + radius * Math.cos(angle); // X position based on the angle
		const y = 50 + radius * Math.sin(angle); // Y position based on the angle
		return { x, y };
	};

	return (
		<section id="sectio1" className="flex justify-center max-lg:flex-col gap-14 w-full max-container relative">
			<div className="relative flex flex-1 items-center justify-center drop-shadow-xl">
				<div className="relative w-screen h-screen">
					<CESCanvas />
					{/* Keywords around the canvas in a circular layout */}
					{keywords.map((keyword, index) => {
						const { x, y } = calculatePosition(index, keywords.length, 40); // radius of 40% around the canvas
						return (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.2 }}
								className={`absolute text-2xl text-black font-bold`}
								style={{
									top: `${y}%`,  // Set top position in percentage based on the circle
									left: `${x}%`, // Set left position in percentage based on the circle
									transform: `translate(-50%, -50%)`,
									whiteSpace: 'nowrap',
								}}
							>
								{keyword}
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SectionWrapper(HeroNew, "HeroNew");
