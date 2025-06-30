import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { FaBolt, FaChartLine, FaWifi, FaFileAlt, FaExclamationTriangle, FaDesktop } from "react-icons/fa";

export default function Home() {
  const features = [
    { 
      title: "Fast Detection", 
      icon: <FaBolt />, 
      description: "Identify anomalies in network traffic with minimal latency and high accuracy.",
      color: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Low False Positives", 
      icon: <FaChartLine />, 
      description: "Advanced algorithms ensure minimal false alarms while maintaining detection sensitivity.",
      color: "from-blue-500 to-indigo-600"
    },
    { 
      title: "Real-time Monitoring", 
      icon: <FaDesktop />, 
      description: "Continuous surveillance of network activity with immediate threat notifications.",
      color: "from-indigo-500 to-purple-600"
    },
    { 
      title: "Live WiFi Packet Analysis", 
      icon: <FaWifi />, 
      description: "Capture and analyze wireless network packets to detect suspicious activities.",
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "CSV-Based Batch Detection", 
      icon: <FaFileAlt />, 
      description: "Process historical network data from CSV files for retrospective analysis.",
      color: "from-pink-500 to-rose-500"
    },
    { 
      title: "Detailed Anomaly Reports", 
      icon: <FaExclamationTriangle />, 
      description: "Comprehensive reports with actionable insights on detected anomalies.",
      color: "from-rose-500 to-cyan-500"
    }
  ];
  
  const featureRefs = useRef([]);
  const [activeFeature, setActiveFeature] = useState(null);

  useEffect(() => {
    // Add observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-zoom-in', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Hero Section with animated gradient background */}
      <section className="relative text-center py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 animate-gradient-x"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-pulse drop-shadow-lg mb-6">
            Real-Time KNN Anomaly Detection
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto animate-float">
            Secure your network using intelligent intrusion detection.
          </p>
          
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
                animation: `float ${Math.random() * 10 + 5}s linear infinite`
              }}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        
        {/* Background grid lines */}
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
              }}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="relative bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 opacity-0 translate-y-10 group"
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              {/* Gradient border */}
              <div 
                className="absolute -inset-0.5 rounded-2xl z-0 opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${feature.color.split(' ')[0].replace('from-', '')}, ${feature.color.split(' ')[1].replace('to-', '')})`,
                  filter: 'blur(4px)'
                }}
              ></div>
              
              {/* Content */}
              <div className="relative z-10 p-6 h-full flex flex-col">
                {/* Icon with gradient background */}
                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-2xl bg-gradient-to-br ${feature.color} transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 text-sm flex-grow">
                  {feature.description}
                </p>
                
                {/* Animated line */}
                <div className="w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 group-hover:w-full transition-all duration-500"></div>
                
                {/* Animated particles on hover */}
                {activeFeature === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          width: '2px',
                          height: '2px',
                          opacity: 0.6,
                          boxShadow: '0 0 3px 1px rgba(255, 255, 255, 0.6)',
                          animation: `float ${Math.random() * 3 + 2}s linear infinite`
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add a new section for a call to action */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-indigo-900/30"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Ready to Secure Your Network?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Our KNN-based anomaly detection system provides state-of-the-art protection against network intrusions and unusual traffic patterns.
          </p>
         
        </div>
      </section>

      {/* Footer with subtle animation */}
      <footer className="text-center text-gray-500 text-sm border-t border-gray-800 py-6 px-4 relative overflow-hidden">
        <div className="relative z-10">
          © {new Date().getFullYear()} KNN Anomaly Detection • RV College Of Engineering
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500 animate-gradient-x"></div>
      </footer>
      
      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-5px) translateX(3px); }
          50% { transform: translateY(0) translateX(5px); }
          75% { transform: translateY(5px) translateX(3px); }
        }
      `}</style>
    </div>
  );
}
