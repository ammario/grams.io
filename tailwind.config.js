const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: '10rem',
    },
  },
  plugins: [],
}
