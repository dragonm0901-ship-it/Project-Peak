/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peakDeep: '#0f172a', // deep blue/slate
        peakGreen: '#166534', // forest green
        peakRed: '#991b1b', // soft red
        peakWhite: '#f8fafc', // snow white
        peakDark: '#020617', // dark mode background
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}