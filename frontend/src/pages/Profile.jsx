import React, { useState, useEffect } from 'react';
import { fetchUserDetails } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await fetchUserDetails();
        setUser(data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch user details. Please try again.');
      }
    };

    getUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: "url('./back-ground.jpg')", // Replace with your background image URL
      }}
    >
      {/* Add margin-top to create space between navbar and the container */}
      <div className="max-w-7xl mx-auto bg-gray-900 bg-opacity-80 shadow-lg rounded-lg p-8 mt-16"> 
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-8">Profile</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {user ? (
          <div className="text-center text-white">
            <p className="text-xl font-semibold mb-4">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-xl font-semibold mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-teal-600 rounded-lg text-white font-semibold text-lg transition duration-300 ease-in-out hover:bg-teal-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-white text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
