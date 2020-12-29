/* eslint-env node */
module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        '3': '3px'
      },
      colors: {
        theme_gray: '#F4F4F4',
        theme_textGray: '#989898',
        theme_slateBlue: '#7954E0',
        theme_mediumPurple: '#9881FF',
        theme_lavenderBlue: '#DCD1FF',
        theme_hotPink: '#FE74B9',
        theme_persianPink: '#F28CCD',
        theme_pinkLace: '#FFCEFF',
        theme_rajah: '#FFA64E',
        theme_yellowOrange: '#FFBA59',
        theme_frenchSkyBlue: '#7EB4FF',
        theme_lightSkyBlue: '#90CEFF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
