/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1115',
        lime: {
          DEFAULT: '#C2D100',
          light: '#D4E500',
          dark: '#A8B800',
          glow: 'rgba(194,209,0,0.15)',
        },
        surface: '#14180D',
        'surface-2': '#1A1F10',
        border: '#1E2415',
        muted: 'rgba(255,255,255,0.45)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 24px rgba(194,209,0,0.18)',
        'card': '0 1px 3px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
