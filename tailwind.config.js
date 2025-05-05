/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced brand colors
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#badffd',
          300: '#7ec6fc',
          400: '#39a9f8',
          500: '#0f8ee9', // Base royal blue
          600: '#036fc7',
          700: '#0459a1',
          800: '#084b85',
          900: '#0d406e',
          950: '#002366' // Deep royal blue
        },
        gold: {
          50: '#fffceb',
          100: '#fff6c6',
          200: '#ffec88',
          300: '#ffdd4a',
          400: '#ffcd20', // Bright gold
          500: '#ffd700', // Standard gold
          600: '#e6c200',
          700: '#b29100',
          800: '#927200',
          900: '#7a5d07',
          950: '#463300' // Dark gold
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries')
  ]
};