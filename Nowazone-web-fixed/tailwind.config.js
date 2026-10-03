/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#0F62FE',
          'blue-hover': '#2563EB',
          'blue-dark': '#084EA3',
          emerald: '#10B981',
          navy: '#0E1F33',
          'navy-dark': '#0A1830',
          'navy-deep': '#090D16',
        }
      },
      keyframes: {
        ctaGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(15, 98, 254, 0.55), 0 4px 14px rgba(0, 0, 0, 0.18)' },
          '50%': { boxShadow: '0 0 0 8px rgba(15, 98, 254, 0), 0 4px 14px rgba(0, 0, 0, 0.18)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        fadeSlide: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        ctaGlow: 'ctaGlow 2.2s ease-in-out infinite',
        pulseDot: 'pulseDot 2.2s ease infinite',
        fadeSlide: 'fadeSlide 0.35s ease',
        marquee: 'marquee 35s linear infinite',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0F62FE",
          "primary-content": "#FFFFFF",
          "secondary": "#5980A6",
          "secondary-content": "#FFFFFF",
          "accent": "#10B981",
          "accent-content": "#FFFFFF",
          "neutral": "#0E1F33",
          "neutral-content": "#F8FAFC",
          "base-100": "#F8FAFC",
          "base-200": "#EDF2F7",
          "base-300": "#E2E8F0",
          "base-content": "#0F172A",
          "--rounded-box": "4px",
          "--rounded-btn": "2px",
          "--rounded-badge": "2px",
        },
        dark: {
          "primary": "#0F62FE",
          "primary-content": "#FFFFFF",
          "secondary": "#728FAB",
          "secondary-content": "#FFFFFF",
          "accent": "#10B981",
          "accent-content": "#FFFFFF",
          "neutral": "#0A1830",
          "neutral-content": "#F8FAFC",
          "base-100": "#060A12",
          "base-200": "#090D16",
          "base-300": "#0E1626",
          "base-content": "#F8FAFC",
          "--rounded-box": "4px",
          "--rounded-btn": "2px",
          "--rounded-badge": "2px",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
  },
}
