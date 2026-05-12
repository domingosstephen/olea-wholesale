import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'primary-container': '#131b2e',
        'on-primary': '#ffffff',
        'on-primary-container': '#7c839b',
        'on-primary-fixed-variant': '#3f465c',

        secondary: '#745b11',
        'secondary-container': '#ffdc86',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#795f15',

        background: '#f7f9fb',
        surface: '#f7f9fb',
        'surface-bright': '#f7f9fb',
        'surface-container': '#eceef0',
        'surface-container-low': '#f2f4f6',
        'surface-container-lowest': '#ffffff',
        'surface-variant': '#e0e3e5',

        'on-surface': '#191c1e',
        'on-surface-variant': '#45464d',
        'on-background': '#191c1e',

        outline: '#76777d',
        'outline-variant': '#c6c6cd',

        error: '#ba1a1a',
        'error-container': '#ffdad6',
        'on-error': '#ffffff',
        'on-error-container': '#93000a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        label: ['var(--font-metropolis)', 'var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'label-md': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['12px', { lineHeight: '16px', letterSpacing: '0.03em', fontWeight: '500' }],
      },
      spacing: {
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '32px',
        gutter: '24px',
        'margin-desktop': '64px',
        'margin-mobile': '20px',
      },
      maxWidth: {
        container: '1280px',
      },
      borderRadius: {
        DEFAULT: '2px',
        lg: '4px',
        xl: '8px',
        '2xl': '12px',
        full: '9999px',
      },
      boxShadow: {
        atmospheric: '0 24px 48px -12px rgba(15,23,42,0.08)',
      },
    },
  },
  plugins: [],
}

export default config
