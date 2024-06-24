import React from 'react'
import Button from '../components/Button';
import { arrowRight, design } from '../assets/icons';
import { ces } from '../assets/images';
import Drop from '../components/Drop';
import { ServicesCarousel } from '../components';
import { motion } from "framer-motion";

const OurServices = () => {

	return (
		<section className="justify-center items-center max-container ">
				
			<h3 className="font-palanquin m-auto text-center text-4xl font-bold max-w-3xl">
				Your Pathway to Connectivity:
				<span className="text-[#00309e] font-bold"> Expert Fiber Network </span>
				Mapping Services
			</h3>
			<p className="text-center mt-4 m-auto info-text max-w-3xl">
				Coreline Engineering Solutions, we're dedicated to revolutionizing the telecommunications landscape with our innovative services. From designing robust infrastructure to optimizing network performance, we offer a comprehensive suite of solutions tailored to meet the evolving needs of our clients. Our expertise encompasses:
			</p>
			<div>
			</div>
			<div className="container mx-auto mt-8">
				<ServicesCarousel />
			</div>

		</section>
	)
}

export default OurServices