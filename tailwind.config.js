const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    extend: {
      boxShadow:{
        '3xl': '4px 4px 0 0 #422800',
      },
      colors: {
        primary:"#422800",
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
          
        },
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [],
};