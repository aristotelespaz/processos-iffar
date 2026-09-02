/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iffar: {
          green: {
            DEFAULT: '#00823B',
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#00823B',
            600: '#007033',
            700: '#005c2a',
            800: '#004720',
            900: '#003317',
          },
          red: {
            DEFAULT: '#E30613',
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#E30613',
            600: '#cc0511',
            700: '#b5050f',
            800: '#8e040c',
            900: '#680309',
          },
          gold: '#FFB800',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      screens: {
        'print': {'raw': 'print'},
      }
    },
  },
  plugins: [],
}
