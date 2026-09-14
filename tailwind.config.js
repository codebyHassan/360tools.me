/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*/*.html",
    "./**/*.html",
    "./2048/*.html",
    "./bhabhi-thulla/*.html",
    "./memory-game/*.html",
    "./snake/*.html",
    "./tic-tac-toe/*.html",
    "./word-scramble/*.html",
    "./js/*.js",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fa-navy': '#3e2723',
        'fa-navy-dark': '#2c1b18',
        'fa-navy-light': '#52342f',
        'fa-blue': '#c27803',
        'fa-blue-hover': '#9a5f02',
        'fa-blue-light': '#fef7e7',
        'fa-yellow': '#ffd43b',
        'fa-yellow-hover': '#fcc419',
        'fa-yellow-light': '#fff9db',
        'fa-teal': '#20c997',
        'fa-teal-light': '#e6fcf5',
        'fa-rose': '#fa5252',
        'fa-rose-light': '#ffe3e3',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        urdu: ['"Noto Nastaliq Urdu"', '"Jameel Noori Nastaleeq"', 'serif']
      }
    },
  },
  plugins: [],
}
