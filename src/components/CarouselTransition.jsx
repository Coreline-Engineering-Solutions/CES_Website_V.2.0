import React from 'react'
import { CESphoto1, CESphoto2, CESphoto3 } from '../assets/images'
import { Carousel } from "@material-tailwind/react";

const CarouselTransition = () => {
    return (
        <Carousel transition={{ duration: 2 }} className="rounded-xl">
        <img
          src={CESphoto1}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={CESphoto2}          
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={CESphoto3}           
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    )
}

export default CarouselTransition