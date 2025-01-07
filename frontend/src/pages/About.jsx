import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-800 min-h-screen py-12">  {/* Darker background color for the main page */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-white mb-8">About Us</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              We strive to provide an innovative platform where users can seamlessly explore, interact, and share their passions with others.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 text-lg">
              We believe in building a community that fosters creativity, inclusivity, and mutual respect. Our goal is to provide a safe space for everyone.
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
            <p className="text-gray-300 text-lg">
              Our vision is to redefine the way people connect online, creating a space for dynamic content sharing and engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
