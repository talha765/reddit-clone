/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      reddit_dark:{
        DEFAULT: '#030303', 
      },
    },
  },
},
  plugins: [],
}


