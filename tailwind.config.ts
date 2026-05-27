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
        // Brand families resolve to CSS variables so the active theme
        // (set via data-theme on <html>) can swap them at runtime.
        paprika: {
          50: "rgb(var(--c-paprika-50) / <alpha-value>)",
          100: "rgb(var(--c-paprika-100) / <alpha-value>)",
          200: "rgb(var(--c-paprika-200) / <alpha-value>)",
          500: "rgb(var(--c-paprika-500) / <alpha-value>)",
          600: "rgb(var(--c-paprika-600) / <alpha-value>)",
          700: "rgb(var(--c-paprika-700) / <alpha-value>)",
        },
        turquoise: {
          50: "rgb(var(--c-turquoise-50) / <alpha-value>)",
          100: "rgb(var(--c-turquoise-100) / <alpha-value>)",
          200: "rgb(var(--c-turquoise-200) / <alpha-value>)",
          500: "rgb(var(--c-turquoise-500) / <alpha-value>)",
          600: "rgb(var(--c-turquoise-600) / <alpha-value>)",
          700: "rgb(var(--c-turquoise-700) / <alpha-value>)",
        },
        sand: {
          50: "rgb(var(--c-sand-50) / <alpha-value>)",
          100: "rgb(var(--c-sand-100) / <alpha-value>)",
          200: "rgb(var(--c-sand-200) / <alpha-value>)",
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
