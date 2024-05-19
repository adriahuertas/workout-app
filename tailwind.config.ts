import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 4px 6px rgba(0, 0, 0, 0.3)'
      },
      colors: {
        'primary-dark': 'var(--primary-dark)',
        customGray: 'rgba(31, 41, 55, 1)'
      }
    }
  },
  plugins: []
} satisfies Config
