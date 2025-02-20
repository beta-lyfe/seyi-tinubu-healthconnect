import type { Config } from 'tailwindcss'
import flowbite from 'flowbite-react/tailwind'
import tailwindScroll from 'tailwind-scrollbar'
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
	darkMode: ['class'],
	content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
		flowbite.content()
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			aspectRatio: {
				card: '9 / 16'
			},
			scrollbar: {
				// Define a custom scrollbar size
				width: {
					'extra-thin': '4px',
				},
			},
			fontFamily: {
				Poppins: 'Poppins, sans-serif',
				Montserrat: 'Montserrat, sans-serif'
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					// DEFAULT: "hsl(var(--primary))",
					//DEFAULT: '#f382ec',
					DEFAULT: '#2a9b7d',
					//DEFAULT: '#ff3287',
					// DEFAULT: 'skyblue',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: '#ffffff',
					foreground: '#000000'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [tailwindcssAnimate, flowbite.plugin(), tailwindScroll]
} satisfies Config
