const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./**/*.html', './src/**/*.jsx'],
  theme: {
    // Overrides
    fontFamily: {
      mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    // Extensions
    extend: {
      borderRadius: {
        xl: '1rem',
      },
      colors: {
        navy: {
          100: '#E7E6F0',
          200: '#C2BFDB',
          300: '#9D99C5',
          400: '#544D99',
          500: '#0A006D',
          600: '#090062',
          700: '#060041',
          800: '#050031',
          900: '#030021',
        },
        blue: {
          100: '#E9E9FF',
          200: '#C8C8FE',
          300: '#A7A6FE',
          400: '#6664FD',
          500: '#2421FC',
          600: '#201EE3',
          700: '#161497',
          800: '#100F71',
          900: '#0B0A4C',
        },
        aqua: {
          100: '#E6FBFF',
          200: '#C0F5FF',
          300: '#9AEFFF',
          400: '#4EE2FF',
          500: '#02D6FF',
          600: '#02C1E6',
          700: '#018099',
          800: '#016073',
          900: '#01404D',
        },
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
};
