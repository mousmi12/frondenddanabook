/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'min': '200px', 'max': '800px' },
      // => @media (min-width: 200px and max-width: 800px) { ... }

      'lg': { 'min': '800px', 'max': '1000px' },
      // => @media (min-width: 800px and max-width: 1000px) { ... }

      'xl': { 'min': '1000px', 'max': '10000px' },
      // => @media (min-width: 1000px and max-width: 10000px) { ... }
    },
    boxShadow: {
      '3xl': '0 35px 60px 35px rgba(0, 0, 0, 0.2)',
    },
  },
  plugins: [],
}

