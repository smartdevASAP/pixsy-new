/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // allows manual or context-based toggling
  theme: {
    extend: {
      colors: {
        primary: "#0437FF", // your brand blue //source of primary error here
      },
    },
  },
  plugins: [],
};
