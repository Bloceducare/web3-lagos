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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #C96C4E 9.5%, #AC615D 27%, #895470 37%, #3E3797 70%, #BD6854 84%, #3E3797 100%)',
      },
      textColor: {
        'custom-gradient': 'transparent',
      },
      backgroundClip: {
        text: 'text',
      },
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
  extend:{
    variants:{
extend:{
  display: ["focus-group"]

}
    }
  }
};
