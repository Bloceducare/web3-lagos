/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          c1: "#122B47",
        },  
        gray: {
          cgray: "#E9EFFF",
        },
      },
      width:{
        'big' :"1441px"
      }
    },
    backgroundColor:{
      header:"rgba(255, 255, 255, 1)",
      hero:"rgba(5, 55, 88, 1)"
    }
  },
  plugins: [],
};
