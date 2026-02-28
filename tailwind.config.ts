import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0a0b0f",
          800: "#0f1117",
          700: "#151822",
          600: "#1c2030",
          500: "#252a3a",
        },
        accent: {
          green: "#00e68a",
          red: "#ff4757",
          blue: "#3b82f6",
          purple: "#8b5cf6",
          yellow: "#f59e0b",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
