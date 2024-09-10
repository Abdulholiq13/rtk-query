/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      boxShadow: {
        "3xl": "rgba(99, 99, 99, 0.1) 0px 1px 8px 0px",
      },
    },
  },
  plugins: [],
};
