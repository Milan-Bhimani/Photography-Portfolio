import React, { useState, useEffect } from 'react';
import { fetchItems, fetchUserDetails } from '../services/api';

const Globalfeed = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null); // State to store user details
  const [error, setError] = useState('');
  const [showDescription, setShowDescription] = useState(null); // State to track which image description is visible

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchItems();
        setItems(data); // Assuming each item now contains 'userId.username'
      } catch (error) {
        console.error(error);
        setError('Failed to fetch items. Please try again.');
      }
    };

    const getUserDetails = async () => {
      try {
        const { data } = await fetchUserDetails();
        setUser(data); // Assuming the username is part of the user data
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user details.');
      }
    };

    getItems();
    getUserDetails();
  }, []);

  const toggleDescription = (id) => {
    setShowDescription((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('./back-ground.jpg')`, // Replace with your background image URL
      }}
    >
      <div className="mt-20 max-w-7xl mx-auto bg-gray-900 bg-opacity-80 shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-8">The Global Pulse</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Display the username if user data is available */}
        {user && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Welcome, {user.username}!</h2>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-3xl font-semibold text-white">{item.title}</h3>

              {/* Display the username who uploaded the item */}
              <p className="mt-4 text-gray-400">Uploaded by: {item.userId.username}</p>

              {item.imageUrl && (
                <div>
                  <img
                    src={`https://photography-portfolio-1.onrender.com${item.imageUrl}`} // Corrected line: Template literal for image URL
                    alt={item.title}
                    className="mt-6 w-full h-auto rounded-lg cursor-pointer"
                    onClick={() => toggleDescription(item._id)} // Toggle description visibility on click
                  />

                  {showDescription === item._id && (
                    <p className="mt-4 text-gray-300">{item.description}</p> // Show description only when image is clicked
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Globalfeed;
