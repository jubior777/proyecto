/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        256: "78rem",
      },
      width: {
        20: '6rem'
      },
    },
  },
  plugins: [],
};


