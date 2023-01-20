const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}'
  ],
  mode: 'jit',
  theme: {
    colors: {
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.blue,
      indigo: colors.indigo,
      green: colors.green,
      white: colors.white,
      lightBlue: colors.sky,
      teal: colors.teal,
      orange: colors.orange,
      amber: colors.amber,
      emerald: colors.emerald,
      yellow: colors.yellow,
      pink: colors.pink,
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a'
      },
      Sky: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8',
        500: '#0EA5E9',
        600: '#0284C7',
        700: '#0369A1',
        800: '#075985',
        900: '#0C4A6E'
      }
    },
    container: {
      padding: {
        'DEFAULT': '1rem',
        'sm': '2rem',
        'lg': '4rem',
        'xl': '5rem',
        '2xl': '6rem'
      }
    },
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        'primary-color': '#004b9c',
        'primary-color-hover': '#004085'
      }
    }
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      borderWidth: ['last'],
      opacity: ['disabled'],
      backgroundColor: ['checked'],
      borderColor: ['checked']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}
