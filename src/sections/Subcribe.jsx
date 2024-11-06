import React from 'react';
import { arrowRight } from '../assets/icons';
import Button from '../components/Button';
import { Loginbg, CESphoto3 } from '../assets/images';

const Subscribe = () => {
  return (
    <section id='contact' className='flex flex-col md:flex-row items-stretch  w-full p-6'>
      {/* Left Side: Gradient Background with Image */}
      <div className='flex-1 bg-gradient-to-r from-blue-500 to-blue-800 flex items-center rounded-l-lg justify-center p-8'>
        <div className="relative w-full h-full flex items-center justify-center">
          <img src={CESphoto3} alt="Contact" className="max-w-full max-h-full object-cover rounded-lg shadow-lg" />
        </div>
      </div>
      {/* Right Side: Contact Form */}
      <form className='flex-1 w-full max-w-2xl bg-white flex flex-col gap-6 p-8  border-4 border-blue-800 rounded-r-lg shadow-md'>
        <h3 className='text-4xl leading-[48px] font-palanquin font-bold text-center'>
          Contact us for
          <span className="text-blue-700"> More Information </span>
        </h3>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='text-lg font-semibold'>Fullname and Surname</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Your Name'
            className='input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='email' className='text-lg font-semibold'>Enter Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='example@gmail.com'
            className='input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='subject' className='text-lg font-semibold'>Purpose for Enquiry</label>
          <input
            type='textarea'
            id='subject'
            name='subject'
            placeholder='Subject'
            className='input p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='message' className='text-lg font-semibold'>Message</label>
          <textarea
            id='message'
            name='message'
            placeholder='Your Message'
            className='input p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          ></textarea>
        </div>
        <div className='flex justify-center items-center'>
          <Button label="Send Message" iconURL={arrowRight} />
        </div>
      </form>
    </section>
  );
};

export default Subscribe;
