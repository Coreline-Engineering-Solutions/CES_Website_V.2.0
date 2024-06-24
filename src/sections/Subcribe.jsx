import Button from '../components/Button';
import { arrowRight } from '../assets/icons';

const Subscribe = () => {
  return (
    <section
      id='contact'
      className='max-container flex justify-between items-center max-lg:flex-col gap-10'
    >
      <h3 className='text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold'>
        Contact us for
        <span className="text-blue-700"> More Information </span>
      </h3>
      <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full'>
        <input type='text' placeholder='example@gmail.com' className='input' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full'>
        <Button label="Contact us" iconURL={arrowRight} />
        </div>
      </div>
    </section>
  );
};

export default Subscribe;