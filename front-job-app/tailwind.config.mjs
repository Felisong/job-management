/** @type {import('tailwindcss').Config} */

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFBB27",
        "backdrop-primary": "#0F0000",
        "secondary-backdrop": "#2F1E00",
        "secondary-text": "#FFC9C9",
      },
    },
  },
};
