import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);  // Reference for the dropdown menu
  const buttonRef = useRef(null); // Reference for the button

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) && 
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-semibold text-xl flex items-center">
          <Link to="/home">
            {/* Random Logo Image from Online */}
            <img 
              src=".\public\Shutter Stories logo.png" 
              alt="Logo" 
              className="mr-2 w-10 h-10 object-contain"
            />
            Shutter Stories
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex space-x-6 items-center">
          <li>
            <Link to="/home" className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/personaldata" className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
            My Chronicles
            </Link>
          </li>
          <li>
            <Link to="/globalfeed" className="text-white hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
            The Global Pulse 
            </Link>
          </li>
          <li className="relative">
            <button
              ref={buttonRef}
              className="text-white bg-gray-900 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={toggleMenu}
            >
              Menu
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <ul
                ref={menuRef}
                className="absolute top-full left-0 bg-gray-900 shadow-lg rounded mt-2 w-48"
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-white hover:bg-gray-700 px-4 py-2 block"
                    onClick={() => setMenuOpen(false)} // Close menu after clicking a link
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white hover:bg-gray-700 px-4 py-2 block"
                    onClick={() => setMenuOpen(false)} // Close menu after clicking a link
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-white flex items-center justify-center"
          onClick={toggleMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
