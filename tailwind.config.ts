import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vintage-cream':    '#F5EBD0',
        'vintage-cream-d':  '#EEE0BC',
        'vintage-cream-l':  '#FBF6EC',
        'vintage-amber':    '#D9942B',
        'vintage-amber-l':  '#E8B84B',
        'vintage-amber-d':  '#B87D1E',
        'vintage-maroon':   '#7A1E1E',
        'vintage-maroon-l': '#9B2C2C',
        'vintage-maroon-d': '#5C1616',
        'vintage-forest':   '#1F3D2E',
        'vintage-forest-l': '#2A5240',
        'vintage-charcoal': '#282B2B',
        'whatsapp':         '#25D366',
      },
      fontFamily: {
        cinzel:    ['var(--font-cinzel)', 'serif'],
        lato:      ['var(--font-lato)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
      },
      fontSize: {
        'display': ['clamp(3rem,7vw,5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'h1':      ['clamp(2.5rem,5vw,4rem)',   { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'h2':      ['clamp(2rem,4vw,3rem)',      { lineHeight: '1.1'  }],
        'h3':      ['clamp(1.5rem,3vw,2rem)',    { lineHeight: '1.2'  }],
      },
      screens: {
        xs: '375px',
      },
      transitionTimingFunction: {
        'out-expo':     'cubic-bezier(0.19, 1, 0.22, 1)',
        'smooth':       'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'bounce-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.02)' },
        },
      },
      animation: {
        'spin-slow':   'spin-slow 60s linear infinite',
        'spin-seal':   'spin-slow 10s linear infinite',
        'pulse-ring':  'pulse-ring 2s ease-out infinite',
        'pulse-ring-2':'pulse-ring 2s ease-out 0.8s infinite',
        'float-up':    'float-up 3s ease-in-out infinite',
        'bounce-down': 'bounce-down 1.5s ease-in-out infinite',
        'breathe':     'breathe 4s ease-in-out infinite',
      },
      boxShadow: {
        'brutalist':        '8px 8px 0px 0px #D9942B',
        'brutalist-maroon': '12px 12px 0px 0px #7A1E1E',
        'brutalist-sm':     '4px 4px 0px 0px #D9942B',
        'card':             '0 2px 8px rgba(43,43,43,0.08)',
        'card-hover':       '0 12px 32px rgba(43,43,43,0.16)',
        'button':           '0 4px 14px rgba(122,30,30,0.35)',
        'amber-ring':       '0 0 0 3px rgba(217,154,43,0.45)',
      },
    },
  },
  plugins: [],
}

export default config
