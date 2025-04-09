import React from "react";
import { motion } from "framer-motion";

const Contact = () => (
  <div 
    className="h-screen flex items-center justify-center bg-cover bg-center relative"
    style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/diverse-hands-joined-together-forming-globe_868783-21632.jpg')` }}
  >
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

    {/* Content */}
    <motion.div 
      className="relative z-10 text-center text-white px-6 md:px-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
        Contact <span className="text-yellow-400">Us</span>
      </h1>
      <p className="text-lg md:text-2xl mt-4 drop-shadow-md">
        Have questions or want to collaborate? We’d love to hear from you!
      </p>
      
      {/* Contact Details */}
      <motion.div 
        className="mt-6 text-lg md:text-xl space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p>📞 <span className="font-semibold">Sonali:</span> <a href="tel:9030195814" className="text-yellow-400 hover:text-yellow-300">9030195814</a></p>
        <p>📞 <span className="font-semibold">Veda:</span> <a href="tel:7013907298" className="text-yellow-400 hover:text-yellow-300">7013907298</a></p>
        <p>📧 <span className="font-semibold">Email:</span> <a href="mailto:sonalibanapuram@gmail.com" className="text-yellow-400 hover:text-yellow-300">sonalibanapuram@gmail.com</a></p>
        <p>📧 <span className="font-semibold">Email:</span> <a href="mailto:vedasri2511@gmail.com" className="text-yellow-400 hover:text-yellow-300">vedasri2511@gmail.com</a></p>
      </motion.div>
    </motion.div>
  </div>
);

export default Contact;
