import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RegisterAsVolunteer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    residence: "",
    email: "",
    phone: "",
    password: ""
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/register/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(true);
        setTimeout(() => navigate("/home"), 2000); // Redirect to HOME after 2 seconds
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/diverse-hands-joined-together-forming-globe_868783-21632.jpg')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <h1 className="relative z-10 text-5xl font-bold text-white mb-6">Register as Volunteer</h1>
      
      <motion.div 
        className="relative z-10 bg-white bg-opacity-90 p-8 md:p-12 rounded-2xl shadow-2xl text-center max-w-5xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-600 mt-2">Join us and make an impact!</p>

        {successMessage && (
          <motion.div 
            className="bg-green-500 text-white p-4 rounded-md mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Registration Successful! Redirecting to Home...
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-4 text-left">
          <input 
            type="text" name="fullName" placeholder="Full Name" 
            value={formData.fullName} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" required 
          />
          <input 
            type="text" name="username" placeholder="Username" 
            value={formData.username} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" required 
          />
          <input 
            type="text" name="residence" placeholder="Place of Residence" 
            value={formData.residence} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" required 
          />
          <input 
            type="email" name="email" placeholder="Email" 
            value={formData.email} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" required 
          />
          <input 
            type="tel" name="phone" placeholder="Phone Number" 
            value={formData.phone} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400" required 
          />
          <input 
            type="password" name="password" placeholder="Password" 
            value={formData.password} onChange={handleChange} 
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-yellow-400 col-span-2" required 
          />

          <motion.button 
            type="submit" 
            className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-yellow-500 transition duration-300 col-span-2 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterAsVolunteer;
