/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"#30a6d6",
        secondary:"#a6d5be",
        accent1:"#d6542c",
        accent2:"#94b3f7",
        background:"#f9f9f9",
        cardBackground:"#e0e0e0",
        textPrimary:"#333333",
        textSecondary:"#7d7d7d",
        success:"#2ecc71",
        error:"#e74c3c"
      }
    },
  },
  plugins: [],
}

