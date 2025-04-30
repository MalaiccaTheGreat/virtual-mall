module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      // Custom transitions
      transitionProperty: {
        'scale': 'transform',
        'shadow': 'box-shadow'
      },
      // Custom colors
      colors: {
        primary: {
          500: '#3b82f6', // blue-500
          600: '#2563eb'  // blue-600
        },
        success: {
          500: '#10b981'  // emerald-500
        }
      },
      // Built-in line-clamp (no plugin needed)
      lineClamp: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
    // Add other plugins here (no line-clamp needed)
  ],
  // Optional: Future-proof configuration
  future: {
    hoverOnlyWhenSupported: true,
  },
  // Optional: Disable core plugins if needed
  corePlugins: {
    // float: false, // Example: disable float utilities
  }
};