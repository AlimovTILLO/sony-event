/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '10px',
        sm: '0px',
      },

      screens: {
        DEFAULT: '844px'
      },

    },
    extend: {
      colors: {
        'primary': 'rgb(214, 66, 0)',
        'secondary': 'rgba(255, 255, 255, 0.1)',
        'text': 'rgba(255, 255, 255, 0.8)'
      },
      fontSize: {
        '4xl': '34px'
      }
    },
  },
  plugins: [],
}

