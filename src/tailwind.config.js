/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Include the root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all files in the src directory
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Example custom color
        secondary: '#f43f5e', // Example custom color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Optional: Add Tailwind CSS forms plugin
    require('@tailwindcss/typography'), // Optional: Add Tailwind CSS typography plugin
  ],
};