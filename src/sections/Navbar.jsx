import React from 'react';
import { ces, CESLogoWhite } from '../assets/images';
import { navLinks } from '../constants';
import { hamburger, menu, close, cross } from '../assets/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

	const [toggle, setToggle] = useState(false);

	return (
		<header className='padding-x py-8 absolute z-10 w-full'>
			<nav className='flex justify-between items-center px-2 py-2 w-full bg-slate-600 backdrop-blur-lg  bg-opacity-60 backdrop-filter rounded-full'>
				<a href="/">
					<img className="relative p-2 items-center flex flex-1 justify-center  drop-shadow-xl" src={CESLogoWhite} alt="Logo"
						width={80} />
				</a>

				<ul className='flex-1 flex justify-end px-4 gap-16 max-lg:hidden'>

					{navLinks.map((nav, index) => (
						<li
							key={nav.href}
							className={`p-6 hover:bg-[#00309e] text-white text-[18px] rounded-full mx-2 m-2 cursor-pointer duration-300 hover:text-white font-bold text-center
							${index === navLinks.length - 1 ? "mr-0" : "mr-10"
								} `}
						>
							<a href={`${nav.href}`}>{nav.label}</a>
						</li>

					))}
					<li
						className={`p-6 hover:bg-[#00309e] text-white text-[18px] rounded-full mx-2 m-2 cursor-pointer duration-300 hover:text-white font-bold text-center `}
					>
						<Link to='/narrative'>Narrative Tool</Link>
					</li>
				</ul>
				<div className=' hidden justify-end items-center max-lg:block '>
					{/* Mobile Navigation Items */}
					<img src={toggle ? cross : hamburger}
						alt="Hamburger"
						width={25}
						height={25}
						className="object-contain m-4"
						onClick={() => setToggle((prev) => !prev)} />

					<div
						className={`${toggle ? "flex" : "hidden"
							} p-6 bg-black-gradient absolute top-20 
							right-0 mx-4 my-2 min-w-[140px] rounded-full sidebar`}
					>
						<ul
							className={
								toggle
									? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 text-white'
									: 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
							}
						>
							{/* Mobile Logo */}
							{/* Logo */}
							<h1 className="  flex-1 flex-poppins  font-semibold ss:text-[52px] text-[32px] text-white ss:leading-[100px] leading-[75px]">
								CORE{" "}
								<span className=" text-[#3b82f6] text-gradient font-serif">LINE</span>
							</h1>

							{/* Mobile Navigation Items */}
							{navLinks.map((nav, index) => (
								<li
									key={nav.href}
									className={`p-4 hover:bg-[#3b82f6] rounded-xl cursor-pointer duration-300 hover:text-white font-bold 
									${index === navLinks.length - 1 ? "mr-0" : "mr-10"
										} `}
								>
									<a href={`${nav.href}`}>{nav.label}</a>
								</li>
							))}
						</ul>
					</div>
				</div>

			</nav>
		</header>
	)
}

export default Navbar