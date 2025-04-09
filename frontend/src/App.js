// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import RegisterAsVolunteer from "./pages/RegisterAsVolunteer";
import RegisterAsNgo from "./pages/RegisterAsNgo";
import ForgotPassword from "./pages/ForgotPassword"; // <-- Add this import
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/volunteer" element={<RegisterAsVolunteer />} />
          <Route path="/register/ngo" element={<RegisterAsNgo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <-- New Route */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
