import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ces, CESLogoWhite } from '../assets/images';
import { navLinks } from '../constants';
import { hamburger, cross } from '../assets/icons';

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<header className="padding-x py-8 absolute z-10 w-full">
			<nav className="flex justify-between items-center px-2 py-2 w-full bg-slate-600 backdrop-blur-lg bg-opacity-60 backdrop-filter rounded-full">
				<a href="/">
					<img
						className="relative p-2 items-center flex flex-1 justify-center drop-shadow-xl"
						src={CESLogoWhite}
						alt="Logo"
						width={80}
					/>
				</a>

				<ul className="flex-1 flex justify-end px-4 gap-12 max-lg:hidden">
					{navLinks.map((nav) => (
						<li
							key={nav.href}
							className="p-4 text-white text-[18px] rounded-full cursor-pointer duration-300 hover:bg-[#00309e] hover:text-white font-bold text-center"
						>
							<a href={nav.href}>{nav.label}</a>
						</li>
					))}
					<li
						className="p-4 text-white text-[18px] rounded-full cursor-pointer duration-300 hover:bg-[#00309e] hover:text-white font-bold text-center"
					>
						<Link to="/Login">Login</Link>
					</li>
				</ul>

				<div className="hidden justify-end items-center max-lg:block">
					<img
						src={toggle ? cross : hamburger}
						alt="Hamburger"
						width={25}
						height={25}
						className="object-contain m-4 cursor-pointer"
						onClick={() => setToggle((prev) => !prev)}
					/>

					<div
						className={`${toggle ? "flex" : "hidden"} p-6 bg-slate-600  bg-opacity-90 absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-lg shadow-lg`}
					>
						<ul className="w-full">
							<h1 className="text-center font-bold text-2xl text-white mb-4">
								CORE<span className="text-[#00309e]">LINE</span>
							</h1>

							{navLinks.map((nav) => (
								<li
									key={nav.href}
									className="p-4 text-white rounded-lg cursor-pointer duration-300 hover:bg-[#3b82f6] hover:text-white font-bold text-center mb-2"
								>
									<a href={nav.href}>{nav.label}</a>
								</li>
							))}
							<li
								className="p-4 text-white rounded-lg cursor-pointer duration-300 hover:bg-[#3b82f6] hover:text-white font-bold text-center"
							>
								<Link to="/Login">Login</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
