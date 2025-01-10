import React from 'react';

const Home = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url('./back-ground.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-4xl mx-auto p-8 bg-opacity-90 bg-gray-900 rounded-lg shadow-xl mt-12">
        <h1 className="text-4xl font-extrabold text-center text-teal-400 mb-6">
          Welcome to Photographic Portfolio
        </h1>
        <p className="text-lg text-center text-gray-300 mb-4">
          Your ultimate space to showcase the beauty of your photography work, explore stunning collections, and share your creative journey with the world.
        </p>
        <p className="text-center text-sm text-gray-400">
          Whether you're a professional photographer or someone passionate about capturing moments, Photographic Portfolio is here to help you create, share, and inspire.
        </p>
      </div>
    </div>
  );
};

export default Home;
