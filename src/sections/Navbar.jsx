import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ces } from '../assets/images';
import { navLinks } from '../constants';
import { hamburgerB, crossB } from '../assets/icons';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full fixed top-0 z-50">
      <nav
        className={`flex items-center px-4 py-2 w-full transition-all duration-300 ${
          scrolled ? "bg-[#00309e] bg-opacity-60 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <a href="/" onClick={() => setShowNavbar((prev) => !prev)}>
          <img
            className="p-2 flex items-center justify-center bg-white rounded-3xl cursor-pointer"
            src={ces}
            alt="Logo"
            width={90}
          />
        </a>

        {/* Conditionally render the navbar content based on showNavbar */}
        {showNavbar && (
          <>
            <h1 className="text-center font-bold text-lg text-black bg-white rounded-r-3xl p-2">
              CORE<span className="text-[#00309e]">LINE</span> Engineering Solutions
            </h1>
            
            <ul className="flex-1 flex justify-end px-4 gap-8 max-lg:hidden">
              {navLinks.map((nav) => (
                <li
                  key={nav.href}
                  className="px-6 py-3 rounded-full bg-transparent drop-shadow-lg border-2 border-white text-white font-bold hover:bg-white hover:text-blue-800 transition transform hover:scale-105 shadow-lg"
                >
                  <a href={nav.href}>{nav.label}</a>
                </li>
              ))}
              <li className="px-6 py-3 rounded-full bg-transparent drop-shadow-lg border-2 border-white text-white font-bold hover:bg-white hover:text-blue-800 transition transform hover:scale-105 shadow-lg">
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
                className={`${
                  toggle ? "flex" : "hidden"
                } flex-col p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
                  toggle ? "scale-100" : "scale-95"
                }`}
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
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
