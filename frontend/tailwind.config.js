/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-in': 'slide-in 0.5s ease-out',
        'zoom-in': 'zoom-in 0.5s ease-out',
        'spin-slow': 'spin 6s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'vibrate': 'vibrate 0.3s linear infinite',
        'glitch': 'glitch 1s linear infinite',
        'hue-rotate': 'hue-rotate 10s linear infinite',
        'morph': 'morph 8s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px 5px rgba(66, 153, 225, 0.5)' },
          '50%': { boxShadow: '0 0 20px 10px rgba(66, 153, 225, 0.7)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'vibrate': {
          '0%, 100%': { transform: 'translate(0)' },
          '10%': { transform: 'translate(-2px, -2px)' },
          '20%': { transform: 'translate(2px, -2px)' },
          '30%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, 2px)' },
          '50%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, -2px)' },
          '70%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
          '90%': { transform: 'translate(-2px, -2px)' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        },
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        'morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '50%': { borderRadius: '40% 60% 30% 70%/60% 40% 70% 30%' },
          '75%': { borderRadius: '60% 40% 70% 30%/40% 70% 30% 60%' },
        },
      },
    },
  },
  plugins: [],
}



