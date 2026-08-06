export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        cyber: {
          ink: "#08111f",
          panel: "#101a2d",
          blue: "#38bdf8",
          cyan: "#22d3ee",
          violet: "#8b5cf6",
          green: "#22c55e",
          red: "#ef4444",
        },
      },
      boxShadow: {
        glow: "0 0 35px rgba(34, 211, 238, 0.22)",
      },
    },
  },
  plugins: [],
};

