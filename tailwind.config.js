/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-glow': 'rgba(99, 102, 241, 0.4)',
        bg: '#030712',
        'bg-secondary': '#111827',
        text: '#f9fafb',
        'text-dim': '#9ca3af',
        border: 'rgba(255, 255, 255, 0.1)',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
