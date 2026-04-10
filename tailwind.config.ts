import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["Inter", ...fontFamily.sans],
			notion: ["Inter", ...fontFamily.sans],
		},
  		borderRadius: {
  			lg: '12px',
  			md: '8px',
  			sm: '4px',
			pill: '9999px',
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
			notion: {
				blue: {
					DEFAULT: '#0075de',
					active: '#005bab',
					focus: '#097fe8',
					badge: '#f2f9ff',
					'badge-text': '#097fe8',
				},
				black: 'rgba(0,0,0,0.95)',
				warm: {
					white: '#f6f5f4',
					dark: '#31302e',
					gray500: '#615d59',
					gray300: '#a39e98',
				},
				teal: '#2a9d99',
				green: '#1aae39',
				orange: '#dd5b00',
				pink: '#ff64c8',
				purple: '#391c57',
				brown: '#523410',
			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
		letterSpacing: {
			'notion-display': '-2.125px',
			'notion-secondary': '-1.875px',
			'notion-heading': '-1.5px',
			'notion-subheading': '-0.625px',
			'notion-card-title': '-0.25px',
			'notion-body-large': '-0.125px',
			'notion-badge': '0.125px',
		},
		boxShadow: {
			'notion-card': '0px 4px 18px rgba(0,0,0,0.04), 0px 2.025px 7.84688px rgba(0,0,0,0.027), 0px 0.8px 2.925px rgba(0,0,0,0.02), 0px 0.175px 1.04062px rgba(0,0,0,0.01)',
			'notion-deep': '0px 1px 3px rgba(0,0,0,0.01), 0px 3px 7px rgba(0,0,0,0.02), 0px 7px 15px rgba(0,0,0,0.02), 0px 14px 28px rgba(0,0,0,0.04), 0px 23px 52px rgba(0,0,0,0.05)',
		},
	keyframes: {
		'accordion-down': {
			from: {
				height: '0'
			},
			to: {
				height: 'var(--radix-accordion-content-height)'
			}
		},
		'accordion-up': {
			from: {
				height: 'var(--radix-accordion-content-height)'
			},
			to: {
				height: '0'
			}
		},
		'loading-bar': {
			'0%': { transform: 'translateX(-100%)' },
			'100%': { transform: 'translateX(100%)' }
		}
	},
		
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'loading-bar': 'loading-bar 1.5s infinite ease-in-out',
  		},
		transitionDuration: {
			'2000': '2000ms',
			'3000': '3000ms',
		},
		transitionTimingFunction: {
			'hop': 'cubic-bezier(0.87, 0, 0.13, 1)',
			'expo-out': 'cubic-bezier(0.2, 1, 0.3, 1)',
			'quint-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
		}
  	}
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography')],
} satisfies Config;
