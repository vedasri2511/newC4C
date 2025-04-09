import React from "react";

const About = () => (
  <div 
    className="h-screen flex items-center justify-center bg-cover bg-center relative p-8"
    style={{ backgroundImage: `url('https://i.pinimg.com/originals/c1/45/43/c14543641806429d8a7dfc53f954d799.jpg')` }}
  >
    {/* Overlay for readability */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <div className="relative z-10 bg-white bg-opacity-90 p-8 md:p-12 rounded-xl shadow-lg text-center max-w-4xl">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800">About <span className="text-yellow-500">Connect for Cause</span></h2>
      <p className="mt-4 text-gray-600 text-lg md:text-xl">
        We are committed to creating a sustainable future by connecting NGOs with communities. Our mission is to facilitate effective waste management and ensure cleaner surroundings.
      </p>

      {/* Impact Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img 
          src="https://i.pinimg.com/originals/c1/45/43/c14543641806429d8a7dfc53f954d799.jpg" 
          alt="About Us" 
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
        <div>
          <h3 className="text-3xl font-semibold text-gray-700">Our Impact</h3>
          <ul className="list-disc mt-4 ml-6 text-lg text-gray-600">
            <li>Facilitating clean-up drives with NGOs</li>
            <li>Providing a platform for citizens to report waste-affected areas</li>
            <li>Ensuring efficient coordination for waste management</li>
          </ul>
        </div>
      </div>

      {/* Call to Action */}
    </div>
  </div>
);

export default About;
