/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '10px',
        sm: '25px',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      
      screens: {
        DEFAULT: '680px'
      },
      
    },
    extend: {
      colors: {
        'primary': 'rgb(214, 66, 0)',
        'secondary': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

