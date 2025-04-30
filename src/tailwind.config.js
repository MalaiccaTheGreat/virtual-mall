// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // Optionally: require('@tailwindcss/forms'), require('@tailwindcss/typography')
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
