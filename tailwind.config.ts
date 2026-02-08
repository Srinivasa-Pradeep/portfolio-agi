import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        lora: ['Lora', 'serif'],
        signature: ['Mrs Saint Delafield', 'cursive'],
        'tiro-tamil': ['"Tiro Tamil"', 'serif'],
        'tiro-hindi': ['"Tiro Devanagari Hindi"', 'serif'],
        'chilanka': ['Chilanka', 'cursive'],
        'tiro-kannada': ['"Tiro Kannada"', 'serif'],
        'tiro-telugu': ['"Tiro Telugu"', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        easy: 'hsl(var(--easy))',
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
        },
        feedback: {
          DEFAULT: 'hsl(var(--feedback))',
          foreground: 'hsl(var(--feedback-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'brand-dark': '#0b0f14',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        "fade-in": {
          "0%": {
            opacity: '0',
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: '1',
            transform: "translateY(0)"
          },
        },
        'breathing': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: 0.8,
            boxShadow: '0 0 8px 3px rgba(0, 255, 0, 0.7)'
          },
          '50%': {
            transform: 'scale(1.25)',
            opacity: 1,
            boxShadow: '0 0 12px 4px rgba(0, 255, 0, 0.7)'
          },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'background-pan': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '-200% 0%' },
        },
        'slow-rotate': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'slow-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.03)' },
        },
        'shine': {
          'from': { backgroundPosition: '200% center' },
          'to': { backgroundPosition: '-200% center' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        "fade-in": "fade-in 0.5s ease-out forwards",
        'breathing': 'breathing 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'background-pan': 'background-pan 150s linear infinite',
        'slow-rotate': 'slow-rotate 60s linear infinite',
        'slow-pulse': 'slow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shine': 'shine 8s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
