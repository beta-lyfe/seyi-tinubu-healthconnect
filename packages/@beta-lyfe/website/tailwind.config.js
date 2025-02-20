/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        NunitoSans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'primary':'#2a9b7d',
        'primary2': '#FF3287'
      }
    },
  },
  plugins: [],
}

