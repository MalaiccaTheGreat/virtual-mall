module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      // Add custom transitions and transforms
      transitionProperty: {
        'scale': 'transform',
        'shadow': 'box-shadow'
      },
      // Add custom colors
      colors: {
        'primary': {
          500: '#3b82f6', // blue-500
          600: '#2563eb'  // blue-600
        },
        'success': {
          500: '#10b981'  // emerald-500
        }
      },
      // Add line-clamp utility
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'), // For text truncation
    require('@tailwindcss/aspect-ratio') // For image containers
  ],
};