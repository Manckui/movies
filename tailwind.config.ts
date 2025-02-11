import type { Config } from "tailwindcss"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "background-dark": "#161c24",
        "background-neutral": "#919eab",
        "primary-dark": "#007b55",
        "primary-main": "#00ab55",
        "primary-light": "#5be584",
        "text-primary": "#ffffff",
        "text-secondary": "#637381",
        "transparent-grey": "rgba(145, 158, 171, 0.08)",
        "transparent-primary": "rgba(0, 171, 85, 0.08)"
      },
      spacing: {
        "nav-height": "7rem"
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px"
      }
    }
  },
  plugins: []
} satisfies Config
