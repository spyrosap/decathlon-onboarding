/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'decathlon-blue': '#0082C3',
        'decathlon-blue-dark': '#005A8E',
        'decathlon-blue-light': '#E6F4FC',
        'decathlon-yellow': '#FFD700',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
