import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      <ul className="navbar">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/personaldata">Personal Data</Link></li>
        <li><Link to="/globalfeed">Global Feed</Link></li>
        <li className="menu" onMouseLeave={closeMenu}>
          <button onClick={toggleMenu}>Menu</button>
          {menuOpen && (
            <ul className="dropdown">
              <li><Link to="/profile" onClick={closeMenu}>Profile</Link></li>
              <li><Link to="/about" onClick={closeMenu}>About Us</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
