/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Traditional Arabic', 'serif']
      },
      colors: {
        primary: {
          DEFAULT: '#4CAF50', // Hijau utama
          light: '#81C784',
          dark: '#388E3C',
        },
        secondary: {
          DEFAULT: '#8BC34A', // Hijau lime
          light: '#AED581',
          dark: '#689F38',
        },
        accent: {
          DEFAULT: '#FFD54F', // Kuning untuk aksen
          light: '#FFE082',
          dark: '#FFC107',
        },
        sky: {
          DEFAULT: '#03A9F4', // Biru langit dari background
          light: '#4FC3F7',
          dark: '#0288D1',
        },
        grass: {
          DEFAULT: '#8BC34A', // Hijau rumput di bawah
          light: '#AED581',
          dark: '#689F38',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      backgroundImage: {
        'hero-pattern': 'linear-gradient(120deg, #4CAF50 0%, #8BC34A 100%)',
        'card-pattern': 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
      screens: {
        'xs': '475px',
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      }
    },
  },
  plugins: [],
}

