/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Space Dark Theme
        background: '#020617', // Slate 950
        surface: '#0f172a',    // Slate 900
        surfaceHighlight: '#1e293b', // Slate 800

        // Neon Accents
        primary: {
          DEFAULT: '#3b82f6', // Blue 500
          glow: '#60a5fa',    // Blue 400
          dark: '#1d4ed8',    // Blue 700
        },
        accent: {
          cyan: '#06b6d4',    // Cyan 500
          violet: '#8b5cf6',  // Violet 500
          rose: '#f43f5e',    // Rose 500
        },

        // Text
        text: {
          primary: '#f8fafc', // Slate 50
          secondary: '#94a3b8', // Slate 400
          tertiary: '#64748b', // Slate 500
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'slow-spin': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)',
      }
    },
  },
  plugins: [],
}
