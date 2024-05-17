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
        primary: "#19603E",
        "primary-variant": "#759072",
        "on-primary": "#F6ECE1",
        secondary: "#0B3B59",
        "secondary-variant": "#376989",
        "on-secondary": "#F6ECE1",
        background: "#D1C0A7",
        "on-background": "#624835",
      },
    },
  },
  plugins: [],
};
export default config;
