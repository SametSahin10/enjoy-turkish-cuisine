import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, Turkish-inspired palette
        paprika: {
          50: "#fdf3f0",
          100: "#fbe2db",
          500: "#d2502a",
          600: "#b83f1f",
          700: "#97331a",
        },
        turquoise: {
          50: "#eefcfb",
          500: "#1aa7a0",
          600: "#138a84",
        },
        sand: {
          50: "#faf7f0",
          100: "#f3ecdc",
          200: "#e7d9bd",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
