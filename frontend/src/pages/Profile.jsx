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
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-teal-400 text-center mb-8">Profile</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {user ? (
          <div className="text-center">
            <p className="text-xl font-semibold text-white mb-4">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-xl font-semibold text-white mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <button
              onClick={handleLogout}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-300 ease-in-out"
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
