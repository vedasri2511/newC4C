import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { registerNgo } from "../services/ngoService";

const RegisterAsNgo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    registrationNumber: "",
    website: "",
    description: "",
    areasOfFocus: []
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
      const response = await registerNgo(formData);
      console.log("Registration successful:", response);
      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.error || "Failed to register NGO. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/diverse-hands-joined-together-forming-globe_868783-21632.jpg')` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Heading */}
      <h1 className="relative z-10 text-5xl font-bold text-white mb-6">Register as NGO</h1>
      
      {/* Registration Form */}
      <motion.div 
        className="relative z-10 bg-white bg-opacity-90 p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-5xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-600 mt-2">Join us and make an impact!</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4 text-left">
          <input 
            type="text" 
            name="organizationName" 
            placeholder="Organization Name" 
            value={formData.organizationName} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="email" 
            name="email" 
            placeholder="Official Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="tel" 
            name="phone" 
            placeholder="Contact Number" 
            value={formData.phone} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="text" 
            name="address" 
            placeholder="Registered Address" 
            value={formData.address} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="text" 
            name="registrationNumber" 
            placeholder="NGO Registration Number" 
            value={formData.registrationNumber} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
            required 
          />
          
          <input 
            type="url" 
            name="website" 
            placeholder="Website (Optional)" 
            value={formData.website} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" 
          />
          
          <textarea 
            name="description" 
            placeholder="Brief Description of Your NGO" 
            value={formData.description} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 col-span-2" 
            rows="3" 
            required 
          />
          
          <motion.button 
            type="submit" 
            className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-yellow-500 transition duration-300 col-span-2"
            whileHover={{ scale: 1.05 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register NGO"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterAsNgo;
