import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Courier New", "monospace"],
        sans: ["Inter", "Helvetica Neue", "sans-serif"],
      },
      colors: {
        "brutal-black": "#000000",
        "brutal-white": "#FFFFFF",
        "brutal-red": "#FF0000",
        "brutal-green": "#00FF00",
        "brutal-dark": "#1a1a1a",
        "brutal-light": "#f5f5f5",
      },
      boxShadow: {
        brutal: "8px 8px 0px rgba(0,0,0,0.8)",
        "brutal-hover": "12px 12px 0px rgba(0,0,0,0.95)",
      },
      borderRadius: {
        brutal: "2px",
      },
      spacing: {
        brutal: "2rem",
      },
      transitionDuration: {
        fast: "100ms",
        base: "200ms",
        slow: "600ms",
      },
      animation: {
        "stagger-in": "stagger-in 0.6s ease-out forwards",
        "pop-in": "pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
      keyframes: {
        "stagger-in": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
