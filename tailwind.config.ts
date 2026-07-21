import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#001427",
          900: "#021D38",
          800: "#052A4D",
          700: "#0A3B69",
        },
        vector: {
          teal: "#2388FF",
          cyan: "#58A9FF",
          blue: "#1677FF",
          gold: "#8BBEFF",
        },
      },
      boxShadow: {
        soft: "0 24px 60px rgba(0, 20, 39, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
