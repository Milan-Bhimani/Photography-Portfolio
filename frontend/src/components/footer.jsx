import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white text-center py-6 sm:text-left sm:px-8">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm sm:text-base">Shutter Stories</p>
          <p className="text-xs sm:text-sm mt-2 sm:mt-0">© 2025 Photography Portfolio. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
