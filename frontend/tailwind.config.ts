// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ["class", "class"], // or 'media' or 'class'
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./views/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//   	extend: {
//   		backgroundImage: {
//   			'custom-gradient': 'linear-gradient(90deg, #C96C4E 9.5%, #AC615D 27%, #895470 37%, #3E3797 70%, #BD6854 84%, #3E3797 100%)'
//   		},
//   		textColor: {
//   			'custom-gradient': 'transparent'
//   		},
//   		backgroundClip: {
//   			text: 'text'
//   		},
//   		colors: {
//   			blue: {
//   				c1: '#122B47'
//   			},
//   			gray: {
//   				cgray: '#E9EFFF'
//   			},
//   			background: 'hsl(var(--background))',
//   			foreground: 'hsl(var(--foreground))',
//   			card: {
//   				DEFAULT: 'hsl(var(--card))',
//   				foreground: 'hsl(var(--card-foreground))'
//   			},
//   			popover: {
//   				DEFAULT: 'hsl(var(--popover))',
//   				foreground: 'hsl(var(--popover-foreground))'
//   			},
//   			primary: {
//   				DEFAULT: 'hsl(var(--primary))',
//   				foreground: 'hsl(var(--primary-foreground))'
//   			},
//   			secondary: {
//   				DEFAULT: 'hsl(var(--secondary))',
//   				foreground: 'hsl(var(--secondary-foreground))'
//   			},
//   			muted: {
//   				DEFAULT: 'hsl(var(--muted))',
//   				foreground: 'hsl(var(--muted-foreground))'
//   			},
//   			accent: {
//   				DEFAULT: 'hsl(var(--accent))',
//   				foreground: 'hsl(var(--accent-foreground))'
//   			},
//   			destructive: {
//   				DEFAULT: 'hsl(var(--destructive))',
//   				foreground: 'hsl(var(--destructive-foreground))'
//   			},
//   			border: 'hsl(var(--border))',
//   			input: 'hsl(var(--input))',
//   			ring: 'hsl(var(--ring))',
//   			chart: {
//   				'1': 'hsl(var(--chart-1))',
//   				'2': 'hsl(var(--chart-2))',
//   				'3': 'hsl(var(--chart-3))',
//   				'4': 'hsl(var(--chart-4))',
//   				'5': 'hsl(var(--chart-5))'
//   			}
//   		},
//   		width: {
//   			big: '1441px'
//   		},
//   		borderRadius: {
//   			lg: 'var(--radius)',
//   			md: 'calc(var(--radius) - 2px)',
//   			sm: 'calc(var(--radius) - 4px)'
//   		}
//   	},
//   	backgroundColor: {
//   		header: 'rgba(255, 255, 255, 1)',
//   		hero: 'rgba(5, 55, 88, 1)'
//   	}
//   },
//   plugins: [require("tailwindcss-animate")],
//   extend:{
//     variants:{
// extend:{
//   display: ["focus-group"]

// }
//     }
//   }
// };
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
          fontFamily: {
            federo: ['Federo', 'serif'],
            dmSans: ['DM Sans', 'sans-serif'],
      },      
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, #C96C4E 9.5%, #AC615D 27%, #895470 37%, #3E3797 70%, #BD6854 84%, #3E3797 100%)'
      },
      textColor: {
        'custom-gradient': 'transparent'
      },
      backgroundClip: {
        text: 'text'
      },
      colors: {
        blue: {
          c1: '#122B47'
        },
        gray: {
          cgray: '#E9EFFF'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        }
      },
      width: {
        big: '1441px'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundColor: {
        header: 'rgba(255, 255, 255, 1)',
        hero: 'rgba(5, 55, 88, 1)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
  variants: {
    extend: {
      display: ["focus-group"]
    }
  }
} satisfies Config

export default config