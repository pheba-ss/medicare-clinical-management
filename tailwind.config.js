/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clinic: {
          teal: "#087F8C",
          dark: "#083F4B",
          background: "#F6F8FB",
        },
      },
    },
  },
  plugins: [],
};