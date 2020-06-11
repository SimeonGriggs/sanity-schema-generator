module.exports = {
  purge: ['./**/*.html', './src/**/*.jsx'],
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
};
