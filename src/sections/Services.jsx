import React from 'react'
import { services } from '../constants'
import { ServiceCard } from "../components";
import { SectionWrapper } from '../hoc';
import { motion } from 'framer-motion';
import { fadeIn, textVariant } from "../utils/motion";

const Services = () => {
  return (
    <>
        <motion.div       variants={fadeIn("up", "spring")}
          id="services" className='max-container flex flex-wrap justify-center gap-9  '>


        {services.map((service, index) => (
          <ServiceCard key={service.label} index={index}  {...service} />
        ))}

    </motion.div>
    	
</>

  )
}

export default SectionWrapper(Services, "services");