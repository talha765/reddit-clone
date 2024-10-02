/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        colors: {
          'black-50': 'rgba(0, 0, 0, 1)', // Custom RGBA color
        },
    },
     borderWidth:{
      '1':'1px',
     },
     fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
    },
  },
},
  plugins: [],
}


