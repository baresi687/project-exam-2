/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        headline: "url('/src/assets/headline-bg.svg')",
      },
    },
  },
  plugins: [],
};
