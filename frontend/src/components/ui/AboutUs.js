import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import { FaUserCircle, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

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

  // Parallax effect for cards
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      cardsRef.current.forEach(card => {
        if (!card) return;
        const depth = 15; // Reduced from 20 for subtler effect
        const moveX = x * depth;
        const moveY = y * depth;
        card.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg) translateZ(10px)`;
      });
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Create particle effect - reduced number and opacity
  const createParticles = (index) => {
    if (!cardsRef.current[index]) return;
    
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) { // Reduced from 20
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 4 + 1; // Smaller particles
      const x = rect.left + Math.random() * rect.width;
      const y = rect.top + Math.random() * rect.height;
      const angle = Math.random() * 360;
      const distance = Math.random() * 80 + 30; // Reduced distance
      const duration = Math.random() * 1.2 + 0.5;
      const hue = Math.random() * 40 + 200; // More blue-focused range
      
      // Set styles
      particle.style.position = 'fixed';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = `hsla(${hue}, 80%, 70%, 0.6)`; // Reduced opacity
      particle.style.borderRadius = '50%';
      particle.style.boxShadow = `0 0 ${size/3}px ${size/6}px rgba(${hue}, 255, 255, 0.4)`; // Subtler glow
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.zIndex = '100';
      particle.style.opacity = '0.7'; // Reduced from 1
      particle.style.transition = `all ${duration}s cubic-bezier(0.165, 0.84, 0.44, 1)`;
      
      document.body.appendChild(particle);
      
      // Animate
      setTimeout(() => {
        particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
        particle.style.opacity = '0';
      }, 10);
      
      // Remove
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, duration * 1000);
    }
  };

  const teamMembers = [
    {
      name: "Navya Gopalkrishna Hebbar",
      bio: "I am a passionate computer science student with a keen interest in machine learning, artificial intelligence, and web development. I love to explore different technologies and work on innovative projects. I am excited to be a part of the ever-growing tech field and contribute to impactful projects.",
      skills: "Machine Learning, Web Development, AI, Data Science",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    },
    {
      name: "Yashaswini S",
      bio: "I am an aspiring data scientist with a deep interest in data analytics and the application of machine learning algorithms to solve real-world problems. I am passionate about uncovering patterns in data and using them to build smarter solutions. I aim to work on projects that make a difference in the world.",
      skills: "Data Science, Machine Learning, Data Analytics, Python",
      social: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com"
      }
    }
  ];

  return (
    <>
      <Header />
      <section id="about-us" className="relative bg-black text-white py-16 overflow-hidden min-h-screen">
        {/* Animated background - more subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/10 to-indigo-900/20 animate-gradient-x"></div>
        
        {/* Neural network lines - reduced opacity */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <div 
              key={`h-${i}`}
              className="absolute bg-cyan-400"
              style={{
                top: `${(i / 10) * 100}%`,
                left: 0,
                width: '100%',
                height: '1px',
                boxShadow: '0 0 4px 0.5px rgba(0, 255, 255, 0.5)',
                transform: `translateY(${Math.sin(Date.now() / 2000 + i) * 5}px)`,
                opacity: 0.2
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div 
              key={`v-${i}`}
              className="absolute bg-blue-400"
              style={{
                top: 0,
                left: `${(i / 10) * 100}%`,
                width: '1px',
                height: '100%',
                boxShadow: '0 0 4px 0.5px rgba(0, 100, 255, 0.5)',
                transform: `translateX(${Math.sin(Date.now() / 2000 + i) * 5}px)`,
                opacity: 0.2
              }}
            />
          ))}
        </div>
        
        {/* Floating orbs - reduced number and opacity */}
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
        
        <div ref={containerRef} className="container mx-auto text-center relative z-10 px-4">
          <h2 className="text-6xl font-bold mb-10 relative inline-block">
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              About Us
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80"></div>
          </h2>
          
          <p className="text-lg mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            We are a team of enthusiastic students from the 4th semester of Computer Science and Engineering - Data Science, at RV College of Engineering, Bangalore. Our goal is to create innovative solutions that contribute to the tech community.
          </p>

          <div className="grid md:grid-cols-2 gap-16 mb-16">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="about-member bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl transition-all duration-300 relative overflow-hidden group"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                  boxShadow: activeCard === index 
                    ? '0 0 25px rgba(30, 64, 175, 0.4)' 
                    : '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
                onMouseEnter={() => {
                  setActiveCard(index);
                  createParticles(index);
                }}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Subtle border glow on hover */}
                <div 
                  className="absolute -inset-0.5 rounded-2xl z-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #1e40af, #4f46e5, #1e40af)',
                    backgroundSize: '200% auto',
                    animation: 'gradient-x 3s linear infinite',
                    filter: 'blur(4px)'
                  }}
                ></div>
                
                {/* Subtle glow behind profile */}
                <div 
                  className="absolute w-40 h-40 rounded-full bg-blue-500/10 blur-xl top-10 left-1/2 transform -translate-x-1/2 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                
                <div className="relative z-10">
                  <div className="mb-6 relative">
                    {/* Profile Icon with subtle glow effect */}
                    <div className="relative inline-block">
                      <FaUserCircle className="text-8xl text-blue-500 mx-auto mb-4 group-hover:text-blue-400 transition-colors duration-300" />
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl"></div>
                    </div>
                    
                    <h3 className="text-3xl font-semibold mb-4 relative inline-block">
                      <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        {member.name}
                      </span>
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-500"></div>
                    </h3>
                  </div>
                  
                  <p className="text-lg mb-6 text-gray-300 leading-relaxed relative">
                    {member.bio}
                    
                    {/* Subtle animated particles on hover */}
                    <span className="absolute inset-0 pointer-events-none">
                      {activeCard === index && [...Array(3)].map((_, i) => (
                        <span 
                          key={i}
                          className="absolute rounded-full bg-white"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: '2px',
                            height: '2px',
                            opacity: 0.5,
                            boxShadow: '0 0 3px 0.5px rgba(255, 255, 255, 0.5)',
                            animation: `float ${Math.random() * 3 + 2}s linear infinite`
                          }}
                        ></span>
                      ))}
                    </span>
                  </p>
                  
                  <div className="mt-6 text-md text-gray-400 font-medium">
                    <span className="text-blue-400">Skills:</span> {member.skills}
                  </div>
                  
                  {/* Social media links */}
                  <div className="mt-6 flex justify-center space-x-6">
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaGithub className="text-2xl" />
                    </a>
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
                    >
                      <FaTwitter className="text-2xl" />
                    </a>
                  </div>
                </div>
                
                {/* Subtle border on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md p-8 rounded-xl relative overflow-hidden group">
            {/* Subtle border glow */}
            <div 
              className="absolute -inset-0.5 rounded-xl z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, #1e40af, #4f46e5, #1e40af)',
                backgroundSize: '200% auto',
                animation: 'gradient-x 3s linear infinite',
                filter: 'blur(4px)'
              }}
            ></div>
            
            <div className="relative z-10">
              <p className="text-lg text-gray-300 mb-4">
                We are working on innovative projects and continually improving our skills to meet the demands of the rapidly evolving tech landscape. Stay tuned for more exciting updates!
              </p>
              <p className="text-lg text-gray-300">
                This project is created under the guidance of <span className="text-blue-400 font-medium">Dr Chetana Murthy</span> and <span className="text-indigo-400 font-medium">Nagraja GS</span>
              </p>
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
      </section>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-5px) translateX(3px); }
          50% { transform: translateY(0) translateX(5px); }
          75% { transform: translateY(5px) translateX(3px); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}

export default AboutUs;
