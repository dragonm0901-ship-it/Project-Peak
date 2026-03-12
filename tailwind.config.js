/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepVoid: '#0F172A', // slate-900 (deep mountain night)
        plasma: '#E17055',   // sunset orange (warm highlight)
        ghost: '#F8FAFC',    // slate-50 (snowy off-white)
        graphite: '#1E293B', // slate-800 (rock/granite)
        forest: '#2D3748',   // dark green/gray
        alpine: '#38B2AC'    // teal/glacier blue
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        drama: ['Cinzel', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      }
    },
  },
  plugins: [],
}