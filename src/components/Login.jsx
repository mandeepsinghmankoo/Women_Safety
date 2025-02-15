import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      alert(response.data.message); // Optional: Show success message
      navigate('/loginUI'); // Navigate to the LoginUI component
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while logging in.');
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="bg-[#232122] shadow-[#07070d] shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-[#f0bd6a] mb-6 text-center">Login Here</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[#f0bd6a] rounded-2xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#f0bd6a] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-[#f0bd6a] rounded-2xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#f0bd6a] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4 flex items-center justify-between space-x-4">
            <button
              type="submit"
              className="w-1/3 bg-[#f0bd6a] hover:bg-[#906b30] text-white font-semibold py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
            >
              Log In
            </button>
          </div>

          <div className="text-sm text-center text-gray-500">
            <a href="#" className="hover:text-[#f0bd6a]">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="mt-6 text-center text-gray-500">
          <span>Don't have an account?</span>{' '}
          <a href="/signup" className="text-[#f0bd6a] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
