/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pathique Dark Theme
        primary: '#3B82F6',        // Bright blue
        accent: '#10B981',         // Green accent
        background: '#0A1929',     // Dark navy background
        surface: '#1E293B',        // Card/surface color
        surfaceLight: '#334155',   // Lighter surface
        textPrimary: '#F1F5F9',    // Light text
        textSecondary: '#94A3B8',  // Secondary text
        danger: '#EF4444',         // Red for SOS
        warning: '#F59E0B',        // Yellow/orange
        success: '#10B981',        // Green
        info: '#3B82F6',           // Blue

        // Legacy colors (for backward compatibility)
        nudge: '#EAF4EE',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-sm': '0 0 10px rgba(59, 130, 246, 0.2)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.5)',
        'glow-primary': '0 0 30px rgba(59, 130, 246, 0.4)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'wave-delay-1': 'wave 1.2s ease-in-out 0.1s infinite',
        'wave-delay-2': 'wave 1.2s ease-in-out 0.2s infinite',
        'wave-delay-3': 'wave 1.2s ease-in-out 0.3s infinite',
        'wave-delay-4': 'wave 1.2s ease-in-out 0.4s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        'wave': {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
      },
    },
  },
  plugins: [],
}
