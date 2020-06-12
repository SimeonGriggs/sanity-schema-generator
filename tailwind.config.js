module.exports = {
  purge: ['./**/*.html', './src/**/*.jsx'],
  theme: {
    extend: {
      borderRadius: {
        xl: '1rem',
      },
      colors: {
        green: {
          '100': '#f3fcfb',
          '200': '#c2f0eb',
          '300': '#90e4dc',
          '400': '#63d9cd',
          '500': '#32cdbd',
          '600': '#28a497',
          '700': '#1e7b72',
          '800': '#14524c',
          '900': '#0a2926',
        },
        purple: {
          '100': '#f1f0ff',
          '200': '#b7affe',
          '300': '#7c6efc',
          '400': '#4631fb',
          '500': '#1b04e7',
          '600': '#1503b9',
          '700': '#10028c',
          '800': '#0b025f',
          '900': '#060132',
        },
      },
    },
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  plugins: [],
};
