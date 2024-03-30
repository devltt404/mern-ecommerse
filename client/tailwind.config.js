/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "639px" },
      xs: { max: "360px" },
      "min-2xl": { min: "1536px" },
      "min-xl": { min: "1280px" },
      "min-lg": { min: "1025px" },
      "min-md": { min: "769px" },
      "min-sm": { min: "640px" },
      "min-xs": { min: "361px" },
    },
  },
  plugins: [],
};
