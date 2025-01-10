import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Reference for the dropdown menu
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
    <nav className="fixed top-0 left-0 w-full p-4 bg-black bg-opacity-50 backdrop-blur-md text-white shadow-md z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="font-semibold text-xl flex items-center">
          <Link to="/home" className="flex items-center">
            <img
              src="./Shutter_Stories_logo-removebg-preview.png"
              alt="Logo"
              className="mr-2 w-10 h-10 object-contain"
            />
            Shutter Stories
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden sm:flex space-x-6 items-center">
          <li>
            <Link to="/home" className="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/personaldata" className="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
              My Chronicles
            </Link>
          </li>
          <li>
            <Link to="/globalfeed" className="hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300">
              The Global Pulse
            </Link>
          </li>
          <li className="relative">
            <button
              ref={buttonRef}
              className="bg-transparent hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={toggleMenu}
            >
              Menu
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <ul
                ref={menuRef}
                className="absolute top-full left-0 bg-black bg-opacity-80 shadow-lg rounded mt-2 w-48"
              >
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-gray-700 px-4 py-2 block"
                    onClick={() => setMenuOpen(false)} // Close menu after clicking a link
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:bg-gray-700 px-4 py-2 block"
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
          className="sm:hidden flex items-center justify-center"
          onClick={toggleMenu}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
 