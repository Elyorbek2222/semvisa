/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0E0D', // Warmer dark background
        gold: {
          DEFAULT: '#D4AF37', // Classic premium gold
          light: '#F3E5AB',
          dark: '#AA8822',
          glow: 'rgba(212,175,55,0.15)',
        },
        lime: { // Keeping lime for backward compatibility or dual-tone
          DEFAULT: '#C2D100',
          light: '#D4E500',
          dark: '#A8B800',
          glow: 'rgba(194,209,0,0.15)',
        },
        surface: '#151412',
        'surface-2': '#1C1A17',
        border: '#23201C',
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
