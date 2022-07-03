module.exports = {
  content: ["./client/src/**/*.{html,js,tsx,ts}"],
  theme: {
    fontFamily: {
      sans: ['Barlow', 'sans-serif'],
      serif: ['DM Mono', 'monospace']
    },
    extend: {
      gridTemplateColumns: {
        24: 'repeat(24, minmax(0, 1fr))',
      },
      height: {
        0.25: '0.075rem'
      },
      margin: {
        0.25: '0.075rem'
      },
      padding: {
        0.25: '0.075rem'
      },
      colors: {
        'neutral': {
          850: '#212121',
          950: '#141414',
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require('flowbite/plugin')],
};
