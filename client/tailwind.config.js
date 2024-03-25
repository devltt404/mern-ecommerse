/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#F6ECE9",
          100: "#ECD6D0",
          200: "#DAB1A4",
          300: "#C78875",
          400: "#B26148",
          500: "#854836",
          600: "#69392B",
          700: "#502B20",
          800: "#361E16",
          900: "#190E0A",
          950: "#0F0806",
        },
      },
    },
  },
  plugins: [],
};
