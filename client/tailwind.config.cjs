/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#f8b595",
        second: "#f67280",
        third: "#c06c84",
        fourth: "#6c5b7c",
      },
    },
  },
  plugins: [],
};
