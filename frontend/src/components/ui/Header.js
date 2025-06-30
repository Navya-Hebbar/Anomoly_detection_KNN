// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      {/* Logo with glow effect */}
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text transition-all duration-300 hover:scale-105">
        KNN Detection
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {['/', '/predict', '/realtimesimulation', '/aboutus', '/contactus'].map((path, index) => {
          const label = path === '/' ? 'Home' : 
                       path === '/predict' ? 'Predict' :
                       path === '/realtimesimulation' ? 'Realtime' :
                       path === '/aboutus' ? 'About Us' : 'Contact Us';
          
          return (
            <Link 
              key={path}
              to={path} 
              className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          );
        })}
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden text-gray-300 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 py-4 md:hidden animate-slide-in">
          <div className="flex flex-col space-y-4 px-6">
            {['/', '/predict', '/realtimesimulation', '/aboutus', '/contactus'].map((path) => {
              const label = path === '/' ? 'Home' : 
                          path === '/predict' ? 'Predict' :
                          path === '/realtimesimulation' ? 'Realtime' :
                          path === '/aboutus' ? 'About Us' : 'Contact Us';
              
              return (
                <Link 
                  key={path}
                  to={path} 
                  className="text-gray-300 hover:text-white transition-colors duration-300 hover:translate-x-2 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
