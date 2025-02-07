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
      background: "#212121",
      white: "#D9D9D9",
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
      gray: "#363636",
      highlight: "#7EB9D4",
      border: "#4C4C4C"
    },
    fontFamily: {
      radio: ["Radio Canada Big", "sans-serif"],
    },
  },
  plugins: [],
};
