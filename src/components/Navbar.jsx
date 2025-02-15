import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className=" p-2  mx-auto shadow-2xl ">
      <div className="container mx-auto flex items-center justify-between z-50">
        <a href="#logo">
          <img src="/logo2.png" alt="Logo" className="h-14 " />
        </a>
        <div className="flex space-x-6 shadow-2xl font-semibold">
          <NavLink to="/" className="text-white hover:text-lg">Home</NavLink>
          <NavLink to="/about" className="text-white hover:text-lg">About</NavLink>
          <NavLink to="#services" className="text-white hover:text-lg">Services</NavLink>
          <NavLink to="#contact" className="text-white hover:text-lg">Contact</NavLink>
          <NavLink to="/loginUI" className="text-white hover:text-lg">Blog</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;