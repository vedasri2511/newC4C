import React from "react";

const BackgroundSection = ({ children }) => (
  <div className="p-8 text-center bg-gray-100 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
      {children}
    </div>
  </div>
);

export default BackgroundSection;
