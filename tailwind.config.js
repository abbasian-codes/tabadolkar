/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // اگر App Router فعاله
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-rtl")],
}
