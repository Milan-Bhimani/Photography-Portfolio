import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({ email, password });
      localStorage.setItem('token', data.token); // Store the token
      navigate('/home'); // Navigate to home page upon successful login
    } catch (error) {
      console.error(error);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('./back-ground.jpg')", // Replace with your background image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-lg w-full p-8 bg-opacity-90 bg-gray-900 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login to Shutter Stories</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-800 text-white border-2 border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-teal-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-800 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">Don't have an account?</p>
          <Link to="/register">
            <button
              type="button"
              className="mt-2 px-6 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 transition-all"
            >
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
