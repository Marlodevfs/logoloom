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
        // Identity: "paper & ink": pine-green ink on cream paper, ochre accent. The whole UI was built with
        // indigo/violet/slate utilities; remapping them re-themes every page at once.
        indigo: {
          50: "#EDF3EF",
          100: "#D8E5DD",
          200: "#B3CBBC",
          300: "#9BBBA8",
          400: "#6E9E82",
          500: "#3D6E54",
          600: "#24513F",
          700: "#1F4436",
          800: "#1A382D",
          900: "#152E25",
          950: "#0C1E19",
        },
        violet: {
          50: "#EDF3EF",
          100: "#D8E5DD",
          200: "#B3CBBC",
          300: "#9BBBA8",
          400: "#6E9E82",
          500: "#3D6E54",
          600: "#24513F",
          700: "#1F4436",
          800: "#1A382D",
          900: "#152E25",
          950: "#0C1E19",
        },
        slate: {
          50: "#F7F3EB",
          100: "#F1EBDF",
          200: "#DFD6C6",
          300: "#C4BAA8",
          400: "#8E8576",
          500: "#6B6356",
          600: "#524B40",
          700: "#3D372F",
          800: "#2A2621",
          900: "#1F1B16",
          950: "#151310",
        },
        // Warm ochre: the one accent (checks, numbers, the logo thread).
        ocre: {
          50: "#FBF4E6",
          100: "#F5E6C6",
          200: "#EBCF92",
          300: "#E2B865",
          400: "#D09A3E",
          500: "#B07A1F",
          600: "#855A0E",
          700: "#6A470B",
        },
        ink: {
          50: "#EDF3EF",
          100: "#D8E5DD",
          200: "#B3CBBC",
          300: "#9BBBA8",
          400: "#6E9E82",
          500: "#3D6E54",
          600: "#24513F",
          700: "#1F4436",
          800: "#1A382D",
          900: "#152E25",
          950: "#0C1E19",
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
          muted: "#F7F3EB",
          border: "#DFD6C6",
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
