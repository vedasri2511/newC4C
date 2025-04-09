// src/pages/ForgotPassword.js

import React from "react";

const ForgotPassword = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
        <p className="text-gray-700 mb-4">
          Don't worry! We'll help you reset your password.
        </p>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-yellow-500"
        />
        <button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
