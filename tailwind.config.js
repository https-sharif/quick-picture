/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      minWidth: {
        '200': '200px',
      },
      innerShadow: {
        'sm': 'inset 0 0 5px rgba(0, 0, 0, 1)',
        'md': 'inset 0 0 10px rgba(0, 0, 0, 1)',
        'lg': 'inset 0 0 20px rgba(0, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}

