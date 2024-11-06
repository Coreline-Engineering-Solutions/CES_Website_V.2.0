import React from 'react';
import { ServiceCarousel } from '../constants';

const ServicesV2 = () => {
    return (
        <section className="flex flex-col items-center py-10 bg-gray-100">
            <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-6 text-center text-[#00309e]">Our Services</h2>
            <p className="text-center mt-4 m-auto info-text max-w-4xl text-lg lg:text-xl xl:text-2xl 2xl:text-2xll mb-10 text-gray-600">
                Discover the range of services we offer to empower your projects and drive success.
            </p>

            {/* Main Grid for the top three services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-3 gap-8 px-4 w-full mb-8">
                {ServiceCarousel.slice(0, 3).map((service, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform duration-300 transform hover:scale-105 hover:shadow-xl h-[350px] 2xl:h-[400px]"
                    >
                        <img
                            src={service.src}
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 hover:opacity-90"
                        />
                        <h3 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800 text-center hover:text-[#00309e] transition-colors duration-300">{service.title}</h3>
                        <p className="text-base text-gray-700 text-center md:text-lg mt-2">{service.description}</p>
                    </div>
                ))}
            </div>

            {/* Bottom Row with Centered Flexbox */}
            <div className="flex flex-col items-center gap-8 2xl:flex-row 2xl:justify-center w-full px-4">
                {ServiceCarousel.slice(3).map((service, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col transition-transform duration-300 transform hover:scale-105 hover:shadow-xl h-[350px] 2xl:h-[400px] w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
                    >
                        <img
                            src={service.src}
                            alt={service.title}
                            className="w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 hover:opacity-90"
                        />
                        <h3 className="text-2xl md:text-3xl font-bold mt-4 text-gray-800 text-center hover:text-[#00309e] transition-colors duration-300">{service.title}</h3>
                        <p className="text-base text-gray-700 text-center md:text-lg mt-2">{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ServicesV2;
