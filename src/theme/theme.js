import { createTheme } from "@mui/material/styles";

const purple = "#a855f7";
const pink = "#ec4899";
const cyan = "#22d3ee";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: { main: purple },
    secondary: { main: pink },
    info: { main: cyan },
    ...(mode === "light"
      ? {
          background: { default: "#fcfaf5", paper: "#ffffff" },
        }
      : {
          background: { default: "#060714", paper: "#12142b" },
        }),
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: ['"Roboto"', "Arial", "sans-serif"].join(","),
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
