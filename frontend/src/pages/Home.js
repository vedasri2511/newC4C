import React from "react";

const Home = () => (
  <div 
    className="h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/diverse-hands-joined-together-forming-globe_868783-21632.jpg')` }}
  >
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <div className="relative z-10 text-center text-white px-6 md:px-12">
      <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
        Welcome to <span className="text-yellow-400">Connect for Cause</span>
      </h1>
      <p className="text-lg md:text-2xl mt-4 drop-shadow-md">
        Bridging the gap between communities and NGOs
      </p>
    </div>
  </div>
);

export default Home;
