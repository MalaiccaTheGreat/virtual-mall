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
        },
        // Extended color palette
        accent: {
          purple: '#8b5cf6',
          teal: '#2dd4bf'
        },
        state: {
          success: '#4ade80',
          warning: '#fbbf24',
          danger: '#f87171',
          info: '#60a5fa'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        mono: ['"Fira Code"', 'monospace'] // For technical elements
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        'luxury': '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'button': '0 4px 6px -1px rgba(0, 35, 102, 0.2), 0 2px 4px -1px rgba(0, 35, 102, 0.06)',
        'glow': '0 0 15px rgba(255, 215, 0, 0.5)'
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px'
      },
      // Custom spacing for large screens
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      // Custom border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '2rem',
        '3xl': '3rem'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries')
  ],
}