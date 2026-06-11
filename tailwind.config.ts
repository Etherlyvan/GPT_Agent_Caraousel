import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          light: "#a78bfa",
          dark: "#7c3aed",
        },
        dark: {
          DEFAULT: "#0f172a",
          light: "#1e293b",
          lighter: "#334155",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
      keyframes: {
        pulseBorder: {
          "0%, 100%": { borderColor: "rgba(139,92,246,0.3)" },
          "50%":       { borderColor: "rgba(139,92,246,0.8)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulseBorder: "pulseBorder 1.5s ease infinite",
        spin: "spin 0.8s linear infinite",
        fadeIn: "fadeIn 0.3s ease-out",
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
