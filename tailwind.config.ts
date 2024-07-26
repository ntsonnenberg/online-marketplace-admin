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
      keyframes: {
        "spin-top-in": {
          "0%": {
            transform: "rotate(0deg) translateY(0rem)",
          },
          "50%": {
            transform: "translateY(0.25rem)",
          },
          "100%": {
            transform: "rotate(45deg) translateY(0.25rem) translateX(0.25rem)",
          },
        },
        "spin-bottom-in": {
          "0%": {
            transform: "rotate(0deg) translateY(0rem)",
          },
          "50%": {
            transform: "rotate(-90deg) translateX(0.50rem)",
          },
          "100%": {
            transform:
              "rotate(-45deg) translateY(-0.25rem) translateX(0.25rem)",
          },
        },
        "spin-top-out": {
          "0%": {
            transform: "rotate(45deg) translateY(0.25rem) translateX(0.25rem)",
          },
          "50%": { transform: "translateY(0.25rem)" },
          "100%": { transform: "rotate(0deg) translateY(-0.125rem)" },
        },
        "spin-bottom-out": {
          "0%": {
            transform:
              "rotate(-45deg) translateY(-0.25rem) translateX(0.25rem)",
          },
          "50%": { transform: "rotate(-90deg) translateX(0.50rem)" },
          "100%": { transform: "rotate(0deg) translateY(0.125rem)" },
        },
      },
      animation: {
        "spin-top-in": "spin-top-in 0.5s forwards",
        "spin-bottom-in": "spin-bottom-in 0.5s forwards",
        "spin-top-out": "spin-top-out 0.5s forwards",
        "spin-bottom-out": "spin-bottom-out 0.5s forwards",
      },
    },
  },
  plugins: [],
};
export default config;
