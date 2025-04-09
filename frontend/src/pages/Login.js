// src/pages/Login.js

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    userType: "volunteer" // Default to volunteer
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(formData);
      console.log("Login successful:", response);
      // Redirect based on user type
      if (formData.userType === 'ngo') {
        navigate('/ngo-dashboard');
      } else {
        navigate('/volunteer-dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.error || "Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-poppins bg-gray-100 text-gray-800">
      <div 
        className="h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/diverse-hands-joined-together-forming-globe_868783-21632.jpg')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <motion.div 
          className="relative z-10 bg-white bg-opacity-90 p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-md w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-gray-900">LOG IN</h2>
          <p className="text-gray-600 mt-2">Welcome back! Please enter your details.</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="volunteer"
                  checked={formData.userType === 'volunteer'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Volunteer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="ngo"
                  checked={formData.userType === 'ngo'}
                  onChange={handleChange}
                  className="mr-2"
                />
                NGO
              </label>
            </div>

            <motion.input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              whileFocus={{ scale: 1.02 }}
              required
            />
            <motion.input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange} 
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              whileFocus={{ scale: 1.02 }}
              required
            />
            
            <motion.button 
              type="submit" 
              className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-yellow-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </motion.button>
          </form>
          
          <div className="mt-4 space-y-2">
            <Link to="/forgot-password" className="block text-blue-600 hover:text-yellow-500 underline">
              Forgot Password?
            </Link>
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to={formData.userType === 'volunteer' ? '/register/volunteer' : '/register/ngo'} 
                    className="text-blue-600 hover:text-yellow-500 underline">
                Register as {formData.userType === 'volunteer' ? 'Volunteer' : 'NGO'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
