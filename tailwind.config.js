/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nba-blue': '#17408B',
        'nba-red': '#C9082A'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}