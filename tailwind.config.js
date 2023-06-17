/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'rgba(255,255,255,0.87)',
        'outline-color': '#0073B1',
        'light-blue': '#0A66C2',
        'dark-blue': '#004182',
      },
      boxShadow: {
        custom: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
      },
      fontFamily: {
        roboto: "['Roboto','sans-serif']",
      },
    },
  },
  plugins: [],
}
