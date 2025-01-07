import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';

const Layout = () => {
  const location = useLocation();

  // List of paths where Navbar should not be displayed
  const excludedPaths = ['/login', '/register', '/'];

  return (
    <div>
      {!excludedPaths.includes(location.pathname) && <Navbar /> }
      <Outlet />
    {!excludedPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
