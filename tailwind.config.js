module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      maxWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/2': '50%',
      },
      minWidth: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/2': '50%',
        halfscreen: '50vw',
      },
      minHeight: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/2': '50%',
        32: '8rem',
      },
      maxHeight: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/2': '50%',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['hover'],
    },
  },
  plugins: [],
};
