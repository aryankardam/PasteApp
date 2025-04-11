import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-800 p-4 z-50">
      <div className="container mx-auto flex flex-row gap-10 justify-center">
        <NavLink 
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-[#787ef7]"
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/pastes"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-[#787ef7]"
          }
        >
          Paste
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
