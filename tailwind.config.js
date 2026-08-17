export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07090B',
          900: '#0C1014',
          800: '#14191F',
          700: '#1D242C',
          600: '#28313B',
        },
        steel: {
          600: '#4E5865',
          500: '#6B7683',
          400: '#8B96A3',
          300: '#B4BDC7',
          200: '#D7DDE4',
          100: '#EDF0F4',
          50: '#F6F8FA',
        },
        accent: {
          light: '#3D82D1',
          DEFAULT: '#1F5FA8',
          dark: '#164476',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C7E',
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        industrial: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
}
