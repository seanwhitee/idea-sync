const { default: daisyui } = require("daisyui");

module.exports = {
  daisyui: {
    themes: ["dark"],
  },
  theme: {},
  plugins: [require("daisyui")],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
};
