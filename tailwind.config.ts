import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          primary: '#10b981',
          secondary: '#0f766e',
          accent: '#f59e0b'
        }
      }
    }
  },
  plugins: []
}

export default config
