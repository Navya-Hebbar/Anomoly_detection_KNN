import React, { useState, useEffect } from 'react';
import Header from './Header';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactUs = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData(e.target);
    form.append('access_key', '4a73da4d-2ac7-4830-a1f3-43ebf9fd90b5');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: form
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden py-16 px-4 sm:px-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`h-${i}`}
              className="absolute bg-cyan-400"
              style={{
                top: `${(i / 8) * 100}%`,
                left: 0,
                width: '100%',
                height: '1px',
                boxShadow: '0 0 4px 0.5px rgba(0, 255, 255, 0.5)',
                transform: `translateY(${Math.sin(Date.now() / 2000 + i) * 5}px)`,
                opacity: 0.3
              }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div 
              key={`v-${i}`}
              className="absolute bg-blue-400"
              style={{
                top: 0,
                left: `${(i / 8) * 100}%`,
                width: '1px',
                height: '100%',
                boxShadow: '0 0 4px 0.5px rgba(0, 100, 255, 0.5)',
                transform: `translateX(${Math.sin(Date.now() / 2000 + i) * 5}px)`,
                opacity: 0.3
              }}
            />
          ))}
        </div>
        
        {/* Floating orbs */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              background: `radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, rgba(0,0,0,0) 70%)`,
              filter: 'blur(30px)',
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translate(${mousePosition.x / (i + 70)}px, ${mousePosition.y / (i + 70)}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          />
        ))}
        
        {/* Main content */}
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Have questions about our KNN Anomaly Detection system? We'd love to hear from you!
            </p>
          </div>
          
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transform hover:scale-[1.01] transition-all duration-300">
            <div className="md:flex">
              {/* Contact Information */}
              <div className="md:w-2/5 bg-gradient-to-br from-blue-900/80 to-purple-900/80 p-8 md:p-12 relative overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 opacity-30"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                        <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Our Location</h3>
                        <p className="text-gray-300">Mysore Road, RV College Of Engineering<br />Bengaluru, Karnataka</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                        <FaPhone className="text-cyan-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Phone</h3>
                        <p className="text-gray-300">+91-1234567890</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                        <FaEnvelope className="text-cyan-400 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Email</h3>
                        <p className="text-gray-300">contact@rvce.edu.in</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <h3 className="text-white font-medium mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-full transition-colors duration-300">
                        <FaGithub className="text-white text-xl" />
                      </a>
                      <a href="#" className="bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-full transition-colors duration-300">
                        <FaLinkedin className="text-white text-xl" />
                      </a>
                      <a href="#" className="bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-full transition-colors duration-300">
                        <FaTwitter className="text-white text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:w-3/5 p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-8">Send us a message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-300 relative overflow-hidden group ${
                      isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                    }`}
                  >
                    <span className="absolute top-0 left-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                    <span className="relative">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </button>
                  
                  {status === 'success' && (
                    <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-3 rounded-lg mt-4 animate-fade-in">
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}
                  
                  {status === 'error' && (
                    <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mt-4 animate-fade-in">
                      Oops! Something went wrong. Please try again later.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
          
          {/* Map or additional info section */}
          <div className="mt-16 bg-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Visit Our Campus</h2>
            <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5831650717247!2d77.49692641482133!3d12.92399699088697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3ee159ba3729%3A0x75a3463d510e7536!2sRV%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1652345678901!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle cursor trail effect */}
      <div 
        className="fixed w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          transform: 'translate(-50%, -50%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.1s ease-out'
        }}
      ></div>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-5px) translateX(3px); }
          50% { transform: translateY(0) translateX(5px); }
          75% { transform: translateY(5px) translateX(3px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ContactUs;
