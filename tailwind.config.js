/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blue: {
        100: "#16325B",
        200: "#189BC0",
        300: "#227B94",
        400: "#78B7D0",
        500: "#5FA0BA",
        600: "#3182ce",
        700: "#2b6cb0",
        800: "#2c5282",
        900: "#2a4365",
      },
      highlight: "#FFDC7F"
    },
    fontFamily: {
      radio: ["Radio Canada Big", "sans-serif"],
    },
  },
  plugins: [],
};
