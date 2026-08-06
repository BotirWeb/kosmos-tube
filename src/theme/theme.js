import { createTheme } from "@mui/material/styles";

const brand = "#76323F";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: brand },
    secondary: { main: brand },
    ...(mode === "light"
      ? {
          background: { default: "#fcfaf5", paper: "#ffffff" },
        }
      : {
          background: { default: "#101012", paper: "#1b1b1e" },
        }),
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['"Roboto"', "Arial", "sans-serif"].join(","),
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
