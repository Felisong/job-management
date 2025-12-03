/** @type {import('tailwindcss').Config} */

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#092742ff",
        "backdrop-primary": "#171717",
        "secondary-backdrop": "#092742ff",
        "secondary-text": "#FFC9C9",
      },
    },
  },
};
