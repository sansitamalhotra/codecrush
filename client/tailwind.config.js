/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F6FBFF',
          100: '#E5F3FD',
          200: '#D1E5F4',
          300: '#BDD5E7',
          400: '#AECCE4',
          500: '#9ABDDC',
          600: '#4F9BFF',
        },
      },
    },
  },
  plugins: [],
}
