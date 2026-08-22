/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          600: '#d97706',
          700: '#b45309',
        },
      },
      boxShadow: {
        soft: '0 8px 25px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}

