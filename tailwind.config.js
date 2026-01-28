/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Fintech Theme
        background: '#0B0F19', // Deep Navy
        surface: '#111827',    // Gray 900
        surfaceHighlight: '#1F2937', // Gray 800

        // Professional Accents
        primary: {
          DEFAULT: '#2563EB', // Royal Blue
          dark: '#1E40AF',    // Darker Blue
          light: '#60A5FA',   // Light Blue
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald (Growth)
          dark: '#059669',
        },
        accent: {
          slate: '#64748B',
          gold: '#F59E0B',    // Subtle localized accents
        },
        'primary-glow': '#3B82F6',
        neon: {
          cyan: '#22d3ee',
        },

        // Text
        text: {
          primary: '#F9FAFB', // Gray 50
          secondary: '#9CA3AF', // Gray 400
          tertiary: '#6B7280', // Gray 500
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'], // Unify fonts for clean look
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0B0F19 0%, #111827 100%)',
        'blue-glow': 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'soft-blue': '0 4px 20px -2px rgba(37, 99, 235, 0.2)',
        'card': '0 0 0 1px rgba(255,255,255,0.05), 0 4px 6px -1px rgba(0,0,0,0.1)',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [],
}
