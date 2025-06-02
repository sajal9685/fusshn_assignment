/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
     extend: {
      colors: {
        primary: '#213448',
        secondary: '#547792',
        accent: '#94B4C1',
        light: '#ECEFCA',
      },
    },
  },
  plugins: [],
}
