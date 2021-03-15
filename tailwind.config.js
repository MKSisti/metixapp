module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "1": "1rem",
      "2": "2rem",
      "3": "3rem",
      "4": "4rem",
      "5": "5rem"
    },
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing')
      }),
      gridTemplateColumns: {
        side: "15rem 1fr"
      },
      colors: {
        black: {
          "light-1": "#282C34",
          "light-5": "#2E333A",
          "light-10": "#3C3F46",
          "light-15": "#AAAAAA",
          base: "#21252B"
        },
        blue: {
          "light-1": "#73ADE8",
          base: "#509AE3"
        },
        red: {
          "light-1": "#E03E5C",
          base: "#DD2B4B"
        }
      }
    }
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      padding: ["group-hover", "hover"],
      width: ["hover"],
      translate: ["group-hover"],
      pointerEvents: ["group-hover"]
    }
  },
  plugins: []
};
