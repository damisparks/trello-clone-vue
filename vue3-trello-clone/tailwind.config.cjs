/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#2C3E50',
        'tomato-red': '#E74C3C',
        'frost-white': '#ECF0F1',
        'sky-blue': '#3498DB',
        'ocean-blue': '#2980B9',
        warning: '#ffc000',
        error: '#f31700',
        success: '#28C76F',
        info: '#00cfe8',
      },
    },
  },
  plugins: []
}
