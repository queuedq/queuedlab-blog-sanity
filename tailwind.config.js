/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
    './schemas/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Pretendard Variable', ...defaultTheme.fontFamily.sans],
      serif: ['MaruBuri', ...defaultTheme.fontFamily.serif],
      mono: [
        // Using Google fonts
        // https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css
        'var(--font-roboto-mono)',
        ...defaultTheme.fontFamily.mono,
      ],
    },
    extend: {
      colors: {
        // brand: '#8a2ae2',
        // https://maketintsandshades.com/#8a2ae2
      },
      textColor: {
        // #8b9bb2 is slightly darker version of slate-400. APCA Lc on white:
        // - slate-400 : 50.2
        // - #8b9bb2   : 54.3
        // - slate-500 : 73
        // https://cliambrown.com/contrast/
        // https://colorcontrast.app/
        'category-menu': '#8b9bb2',
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
