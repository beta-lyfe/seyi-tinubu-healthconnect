/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        NunitoSans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'primary': '#FF3287'
      }
    },
  },
  plugins: [],
}

