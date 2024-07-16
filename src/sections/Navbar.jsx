import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ces, CESLogoWhite } from '../assets/images'; // Assuming ces is not used
import { navLinks } from '../constants';
import { hamburger, cross,hamburgerB,crossB } from '../assets/icons';
import { FaHamburger } from 'react-icons/fa';


const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<header className="relative top-0 left-0 right-0 z-10 w-full">
			<nav className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
				<a href="/">
					<img
						className="relative p-2 flex items-center justify-center"
						src={ces}
						alt="Logo"
						width={100}
					/>
				</a>

				<ul className="flex-1 flex justify-end px-4 gap-8 max-lg:hidden">
					{navLinks.map((nav) => (
						<li
							key={nav.href}
							className="p-4 text-black text-[18px] rounded-full cursor-pointer duration-300 hover:bg-blue-800 hover:text-white font-semibold text-center transition-all ease-in-out"
						>
							<a href={nav.href}>{nav.label}</a>
						</li>
					))}
					<li className="p-4 text-black text-[18px] rounded-full cursor-pointer duration-300 hover:bg-blue-800 hover:text-white font-semibold text-center transition-all ease-in-out">
						<Link to="/Login">Sign Up/Login</Link>
					</li>
				</ul>

				<div className="hidden justify-end items-center max-lg:block">
					<img
						src={toggle ? crossB : hamburgerB}
						alt="Menu Toggle"
						width={25}
						height={25}
						className="object-contain m-4 cursor-pointer transition-transform duration-300 transform hover:scale-110"
						onClick={() => setToggle((prev) => !prev)}
					/>

					<div
						className={`${toggle ? "flex" : "hidden"} flex-col p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${toggle ? "scale-100" : "scale-95"}`}
					>
						<ul className="w-full">
							<h1 className="text-center font-bold text-2xl text-black mb-4">
								CORE<span className="text-[#00309e]">LINE</span>
							</h1>

							{navLinks.map((nav) => (
								<li
									key={nav.href}
									className="p-3 text-black rounded-lg cursor-pointer duration-300 hover:bg-blue-800 hover:text-white font-semibold text-center mb-2 transition-all ease-in-out"
								>
									<a href={nav.href}>{nav.label}</a>
								</li>
							))}
							<li className="p-3 text-black rounded-lg cursor-pointer duration-300 hover:bg-blue-800 hover:text-white font-semibold text-center transition-all ease-in-out">
								<Link to="/Login">Sign Up/Login</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
