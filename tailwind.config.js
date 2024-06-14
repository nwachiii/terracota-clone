/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      fontSize: {
        xs: ["9px", "14px"],
        sm: ["13px", "18px"],
        base: ["15px", "22px"],
        lg: ["18px", "26px"],
        xl: ["22px", "30px"],
      },
    },
  },
  plugins: [],
};
