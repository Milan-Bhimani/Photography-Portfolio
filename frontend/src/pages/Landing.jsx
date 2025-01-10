import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div 
      className="min-h-screen flex flex-col justify-center items-center text-white text-center sm:text-left"
      style={{
        backgroundImage: "url('./back-ground.jpg')", // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto p-8 bg-opacity-90 bg-gray-900 rounded-lg shadow-xl flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        {/* Text Section */}
        <div className="mb-6 sm:mb-0 sm:w-1/2">
          <h1 className="text-5xl font-extrabold mb-4 text-teal-400">Welcome to Shutter Stories</h1>
          <p className="text-lg text-gray-300 mb-6">
            Your ultimate space to showcase your photography and creative journey with the world.
          </p>
          <div className="flex gap-6 justify-center sm:justify-start">
            <Link 
              to="/login" 
              className="px-6 py-3 bg-teal-600 rounded-lg text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-teal-700"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-6 py-3 bg-green-600 rounded-lg text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full sm:w-1/2 flex justify-center sm:justify-end mt-6 sm:mt-0">
          <img 
            src="./Shutter_Stories_logo-removebg-preview.png"  // Make sure to replace this with the correct path to your logo image
            alt="Shutter Stories" 
            className="w-3/4 sm:w-full rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
