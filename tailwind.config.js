const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    extend: {

      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        cursive: ['Josefin Sans', "cursive"]
      },
      // fontFamily: {
      //   ...fontFamily,
      //   'sans': ['Source Sans Pro', "sans - serif"],
      //   },
      minWidth: {
        'button-width': '120px',
      },

      boxShadow:{
        'button': '4px 4px 0 0 #E86158',
        '3xl': '4px 4px 0 0 #FBE4C1',
        '3xs': '2px 2px 0 0 black',
      },
      colors: {
        primary:"#FBE4C1",
        secondary:"#E86158",
        accent: "black",
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
      animation: {
        type: 'type 2.0s ease-out .8s both',
        'fade-in-down-1': 'fade-in-down-1 2.0s ease-out',
        'fade-in-down-2': 'fade-in-down-2 3.0s ease-out'
      },
      keyframes: {
        type: {
          '0%': { transform: 'translateX(0ch)' },
          '4%, 8%': { transform: 'translateX(1ch)' },
          '12%, 16%': { transform: 'translateX(2ch)' },
          '20%, 24%': { transform: 'translateX(3ch)' },
          '28%, 32%': { transform: 'translateX(4ch)' },
          '36%, 40%': { transform: 'translateX(5ch)' },
          '44%, 48%': { transform: 'translateX(6ch)' },
          '52%, 56%': { transform: 'translateX(7ch)' },
          '60%, 64%': { transform: 'translateX(8ch)' },
          '68%, 72%': { transform: 'translateX(9ch)' },
          '76%, 80%': { transform: 'translateX(10ch)' },
          '84%, 88%': { transform: 'translateX(11ch)' },
          '92%, 96%': { transform: 'translateX(12ch)' },
          '100%': { transform: 'translateX(13ch)' },
        },
        'fade-in-down-1': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-down-2': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '25%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
        
      },
    },
  },
  plugins: [],
};