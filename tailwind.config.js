/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF4F5B",
        gray_bg:'#D9D9D9',
        primary_light: "#FFD0D3",
        business:"#F88F15",
        personal:"#37B7FF",
        project:"#D8D360",
      }
    },
  },
  plugins: [],
}

