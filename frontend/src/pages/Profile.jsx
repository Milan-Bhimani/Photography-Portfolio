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
    <div className="container">
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>}
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;