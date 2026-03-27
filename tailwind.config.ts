import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff8ec",
          100: "#fef0d5",
          200: "#fddda4",
          300: "#fbc76c",
          400: "#f8ab32",
          500: "#ef8e11",
          600: "#d86f0d",
          700: "#b2510f",
          800: "#904013",
          900: "#763614",
        },
        ink: {
          950: "#08111d",
          900: "#0d1a29",
          850: "#122134",
          800: "#18283b",
          700: "#26425f",
          600: "#3b5c80",
        },
        mist: {
          50: "#f7f8fb",
          100: "#eef1f6",
          200: "#dbe2ee",
          300: "#c4cfdf",
          400: "#95a6c0",
        },
        mint: {
          400: "#38c8a1",
          500: "#1fa37f",
        },
        rose: {
          400: "#ff7b92",
          500: "#e85c74",
        },
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 0, 0, 0.18)",
        panel: "0 18px 50px rgba(8, 17, 29, 0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(248, 171, 50, 0.18), transparent 35%), radial-gradient(circle at bottom left, rgba(31, 163, 127, 0.12), transparent 25%)",
      },
      fontFamily: {
        sans: ['"DIN Next LT Arabic"', '"Noto Kufi Arabic"', '"Tajawal"', '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
