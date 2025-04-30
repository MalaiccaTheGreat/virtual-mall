// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // Include the root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all files in the src directory
    './src/components/**/*.{js,jsx,ts,tsx}', // Include all files in the components folder
    './src/pages/**/*.{js,jsx,ts,tsx}', // Include all files in the pages folder
  ],
  theme: {
    extend: {
      transitionProperty: {
        scale: 'transform', // Add scale transitions
        shadow: 'box-shadow', // Add shadow transitions
      },
      colors: {
        primary: {
          500: '#3b82f6', // Primary blue
          600: '#2563eb', // Darker primary blue
        },
        success: {
          500: '#10b981', // Success green
        },
      },
      lineClamp: {
        1: '1', // Clamp 1 line
        2: '2', // Clamp 2 lines
        3: '3', // Clamp 3 lines
        4: '4', // Clamp 4 lines
        5: '5', // Clamp 5 lines
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'), // Enable aspect ratio utilities
    // Uncomment the following plugins if needed:
    // require('@tailwindcss/forms'), // Enable form styling
    // require('@tailwindcss/typography'), // Enable typography utilities
  ],
  future: {
    hoverOnlyWhenSupported: true, // Optimize hover styles for supported browsers
  },
};
