import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Identity: school-pen ink blue on desk grey. The whole UI was built with
        // indigo/violet/slate utilities; remapping them re-themes every page at once.
        indigo: {
          50: "#EEF2FB",
          100: "#DCE3F6",
          200: "#B9C6EC",
          300: "#8EA2DE",
          400: "#5F78CC",
          500: "#3B57B9",
          600: "#2340A8",
          700: "#1C3488",
          800: "#182B6B",
          900: "#142353",
          950: "#0D1736",
        },
        violet: {
          50: "#EEF2FB",
          100: "#DCE3F6",
          200: "#B9C6EC",
          300: "#8EA2DE",
          400: "#5F78CC",
          500: "#3B57B9",
          600: "#2340A8",
          700: "#1C3488",
          800: "#182B6B",
          900: "#142353",
          950: "#0D1736",
        },
        slate: {
          50: "#F3F4F1",
          100: "#E9ECE8",
          200: "#D5D9D3",
          300: "#B7BCB5",
          400: "#8A9089",
          500: "#646A64",
          600: "#4C524D",
          700: "#383D39",
          800: "#25292A",
          900: "#1B1D21",
          950: "#121416",
        },
        ink: {
          50: "#EEF2FB",
          100: "#DCE3F6",
          200: "#B9C6EC",
          300: "#8EA2DE",
          400: "#5F78CC",
          500: "#3B57B9",
          600: "#2340A8",
          700: "#1C3488",
          800: "#182B6B",
          900: "#142353",
          950: "#0D1736",
        },
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        surface: {
          light: "#FFFFFF",
          muted: "#F8FAFC",
          border: "#E2E8F0",
          dark: "#0F172A",
          darkCard: "#1E293B",
          darkBorder: "#334155",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        paper: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        elevated: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      animation: {
        "weave": "weave 3s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        weave: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(3deg) scale(1.02)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
