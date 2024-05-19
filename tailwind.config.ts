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
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'button-bg-light': 'var(--button-bg-light)',
        'button-bg-dark': 'var(--button-bg-dark)',
        'button-text-light': 'var(--button-text-light)',
        'button-text-dark': 'var(--button-text-dark)',
        'button-bg-hover-light': 'var(--button-bg-hover-light)',
        'button-bg-hover-dark': 'var(--button-bg-hover-dark)',
        'button-text-hover': 'var(--button-text-hover)'
      }
    }
  },
  plugins: []
} satisfies Config
