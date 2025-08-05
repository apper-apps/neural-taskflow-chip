/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4EF5',
        secondary: '#8B80F8',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#29B6F6',
        priority: {
          low: '#4CAF50',
          medium: '#FFA726',
          high: '#FF6B6B',
          urgent: '#E91E63'
        },
        category: {
          work: '#5B4EF5',
          personal: '#4CAF50',
          shopping: '#FF9800',
          health: '#E91E63',
          finance: '#2196F3',
          learning: '#9C27B0',
          projects: '#795548',
          social: '#FF5722'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      animation: {
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
        'bounce-check': 'bounceCheck 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'draw-check': 'drawCheck 0.2s ease-out 0.1s both'
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceCheck: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        },
        drawCheck: {
          '0%': { strokeDashoffset: '16' },
          '100%': { strokeDashoffset: '0' }
        }
      }
    },
  },
  plugins: [],
}