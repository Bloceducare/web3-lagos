const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // or 'media' or 'class'
  content: [
    "./pages/**/*.{js,ts,jsx,tsx},\r\n    ./components/**/*.{js,ts,jsx,tsx},\r\n    ./views/**/*.{js,ts,jsx,tsx},",
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|button|ripple|spinner|calendar|date-input|popover).js"
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
  plugins: [nextui()],
};
