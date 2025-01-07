import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const Layout = () => {
  const location = useLocation();

  // List of paths where Navbar should not be displayed
  const excludedPaths = ['/login', '/register', '/'];

  return (
    <div>
      {!excludedPaths.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
