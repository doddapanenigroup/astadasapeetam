/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          900: '#480a11',
          800: '#5a0c14',
          700: '#78131e',
          600: '#941b27',
        },
        saffron: {
          500: '#e86314',
          600: '#d9530f',
          700: '#b83f05',
        },
        templeGold: {
          400: '#f3be4c',
          500: '#d87e1a',
          600: '#c5932a',
        }
      },
    },
  },
  plugins: [],
};
