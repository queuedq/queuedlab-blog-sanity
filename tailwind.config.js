/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#8a2ae2',
        // https://maketintsandshades.com/#8a2ae2
        'brand-25': '#f8f2fd',
        'brand-50': '#f3eafc',
        'brand-100': '#e8d4f9',
        'brand-200': '#d0aaf3',
        'brand-300': '#b97fee',
        'brand-400': '#a155e8',
        'brand-500': '#8a2ae2',
        'brand-600': '#7c26cb',
        'brand-700': '#6e22b5',
        'brand-800': '#611d9e',
        'brand-900': '#531988',

        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
        relaxed: 1.75,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
