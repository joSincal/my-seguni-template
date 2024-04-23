module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        seguni: {
          50: "#eef8ff",
          100: "#dcf1ff",
          200: "#b2e5ff",
          300: "#6dd1ff",
          400: "#20baff",
          500: "#00a2ff",
          600: "#0080df",
          700: "#0066b4",
          800: "#005695",
          900: "#00477a",
          950: "#00335d",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
