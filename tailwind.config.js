module.exports = {
  darkMode: 'class',
  // ... rest of your config
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0ea5e9",
        dark: "#0f172a"
      }
    }
  },
  plugins: []
}