/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        // Galaxy palette — deep near-black with violet undertone
        void: {
          DEFAULT: '#08060f',
          800: '#0c0a16',
          700: '#12101f',
          600: '#1a1730',
        },
        violet: {
          glow: '#a855f7',
          core: '#7c3aed',
          deep: '#5b21b6',
        },
        nebula: {
          pink: '#d946ef',
          blue: '#6366f1',
          cyan: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'violet-radial':
          'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25), transparent 60%)',
        'nebula-gradient':
          'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #d946ef 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(168,85,247,0.5)',
        'glow-lg': '0 0 80px -20px rgba(168,85,247,0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'aurora-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(12%, 8%) scale(1.15)' },
          '66%': { transform: 'translate(-8%, 4%) scale(0.95)' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-10%, 10%) scale(1.1)' },
          '66%': { transform: 'translate(6%, -6%) scale(1.05)' },
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-6%, -10%) scale(1.2)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        'aurora-1': 'aurora-1 18s ease-in-out infinite',
        'aurora-2': 'aurora-2 22s ease-in-out infinite',
        'aurora-3': 'aurora-3 26s ease-in-out infinite',
        'spin-slow': 'spin-slow 4s linear infinite',
      },
    },
  },
  plugins: [],
};
