// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
<<<<<<< HEAD
    './index.html', // Include the root HTML file
    './src/**/*.{js,jsx,ts,tsx}', // Include all files in the src directory
    './src/components/**/*.{js,jsx,ts,tsx}', // Include all files in the components folder
    './src/pages/**/*.{js,jsx,ts,tsx}', // Include all files in the pages folder
=======
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
>>>>>>> 866f2e3b46c42e033031326e8937e1cd3647dfd1
  ],
  theme: {
    extend: {
      transitionProperty: {
<<<<<<< HEAD
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
=======
        scale: 'transform',
        shadow: 'box-shadow',
      },
      colors: {
        primary: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        success: {
          500: '#10b981',
        },
      },
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
>>>>>>> 866f2e3b46c42e033031326e8937e1cd3647dfd1
      },
    },
  },
  plugins: [
<<<<<<< HEAD
    require('@tailwindcss/aspect-ratio'), // Enable aspect ratio utilities
    // Uncomment the following plugins if needed:
    // require('@tailwindcss/forms'), // Enable form styling
    // require('@tailwindcss/typography'), // Enable typography utilities
=======
    require('@tailwindcss/aspect-ratio'),
    // Optionally: require('@tailwindcss/forms'), require('@tailwindcss/typography')
>>>>>>> 866f2e3b46c42e033031326e8937e1cd3647dfd1
  ],
  future: {
    hoverOnlyWhenSupported: true, // Optimize hover styles for supported browsers
  },
};
