/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#14110f",
        ink: "#efe7d8",
        muted: "#9c9282",
        copper: "#c97a3e",
        "copper-cap": "#d8b48a",
        forest: "#6b8f5b",
        saffron: "#e3a52b",
        steel: "#5d84a0",
        "steel-cap": "#8fa3ad",
      },
      fontFamily: {
        serif: ["'Fraunces'", "serif"],
        sans: ["'Space Grotesk'", "-apple-system", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
