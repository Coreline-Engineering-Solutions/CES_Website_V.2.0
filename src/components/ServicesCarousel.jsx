import React, { useState, useEffect } from 'react';
import { ServiceCarousel } from '../constants'; // Make sure this is correctly imported
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Tabs = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [fadeState, setFadeState] = useState('opacity-100 transform scale-100');

	useEffect(() => {
		const handleNext = () => {
			setFadeState('opacity-0 transform scale-95');
			setTimeout(() => {
				setActiveTab((prevIndex) => (prevIndex === ServiceCarousel.length - 1 ? 0 : prevIndex + 1));
				setFadeState('opacity-100 transform scale-100');
			}, 500); // Match the timeout duration with the CSS transition duration
		};

		if (!isPaused) {
			const interval = setInterval(handleNext, 10000); // Change interval duration as needed

			return () => clearInterval(interval);
		}
	}, [isPaused]);

	const handleTabClick = (index) => {
		setFadeState('opacity-0 transform scale-95');
		setTimeout(() => {
			setActiveTab(index);
			setFadeState('opacity-100 transform scale-100');
			setIsPaused(true);
			setTimeout(() => setIsPaused(false), 10000); // Pause for 10 seconds
		}, 500);
	};

	return (
		<section className="flex flex-col items-center h-auto w-full mx-auto p-4 lg:p-8">
			<div className="flex justify-center space-x-2 lg:space-x-4 gap-2 lg:gap-9 my-4 flex-wrap">
				{ServiceCarousel.map((item, index) => (
					<button
						key={index}
						onClick={() => handleTabClick(index)}
						className={`px-2 py-1 lg:px-4 lg:py-2 rounded-full ${index === activeTab ? 'bg-[#3b82f6] text-white transform transition duration-500 scale-125' : 'bg-[#00309e] text-white'}`}>
						{item.title}
					</button>
				))}
			</div>
			<div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
				<div className={`transition-all duration-500 ease-in-out ${fadeState} overflow-hidden w-full h-full flex justify-center items-center relative`}>
					<img
						src={ServiceCarousel[activeTab].src}
						alt={ServiceCarousel[activeTab].title}
						className="w-full h-full object-cover"
					/>
					<div className="absolute bottom-4 left-4 right-4 text-white text-center p-4 lg:p-8 bg-[#00309e] backdrop-blur-lg bg-opacity-70 backdrop-filter rounded-[10px] lg:rounded-[20px] shadow-3xl flex-col">
						<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{ServiceCarousel[activeTab].header}</h2>
						<p className="text-sm sm:text-lg md:text-xl lg:text-2xl">{ServiceCarousel[activeTab].description}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tabs;
