import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-gray-900 text-white py-4 shadow-md">
    <nav>
      <ul className="flex justify-center space-x-8">
        <li><Link to="/" className="text-lg font-medium hover:text-yellow-400">Home</Link></li>
        <li><Link to="/about" className="text-lg font-medium hover:text-yellow-400">About</Link></li>
        <li><Link to="/contact" className="text-lg font-medium hover:text-yellow-400">Contact</Link></li>
        <li><Link to="/login" className="text-lg font-medium hover:text-yellow-400">Log In</Link></li>
        <li><Link to="/register/volunteer" className="text-lg font-medium hover:text-yellow-400">Register as Volunteer</Link></li>
        <li><Link to="/register/ngo" className="text-lg font-medium hover:text-yellow-400">Register as NGO</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
