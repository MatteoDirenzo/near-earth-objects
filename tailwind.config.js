module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      black: "#000000",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#2AF598",
      yellow: "#ffc82c",
      white: "#ffffff",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
      avenir: ["Avenir"],
    },
    fontWeight: {
      light: 300,
      "extra-bold": 800,
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        blueToDark:
          "linear-gradient(180deg, #0A1D19 0%, #184159 75.54%, #19435D 86.99%)",
      },
      gridTemplateColumns: {
        asteorids: "3fr 1fr",
      },
    },
  },
  plugins: [],
};
