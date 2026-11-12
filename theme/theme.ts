import { createTheme } from "@mui/material/styles";
import Overrides from "./overrides";

const theme = createTheme({
  palette: {
    primary: {
      light: "#5BE584",
      main: "#00ab55",
      dark: "#007B55",
    },
    secondary: {
      main: "#ff4081",
    },
    info: { light: "#61F3F3", main: "#00B8D9", dark: "#006C9C" },
    success: { light: "#77ED8B", main: "#22C55E", dark: "#118D57" },
    warning: { light: "#FFD666", main: "#FFAB00", dark: "#B76E00" },
    error: { light: "#FFAC82", main: "#FF5630", dark: "#B71D18" },
    // Tema scuro senza mode "dark": le icone (IconButton, azioni DataGrid) devono essere chiare.
    action: {
      active: "#C4CDD5",
      hover: "rgba(145, 158, 171, 0.08)",
      selected: "rgba(145, 158, 171, 0.16)",
      disabled: "rgba(145, 158, 171, 0.8)",
      disabledBackground: "rgba(145, 158, 171, 0.24)",
    },
    background: {
      default: "#161c24",
      paper: "#212B36",
    },
    text: {
      primary: "#ffffff",
      secondary: "#919EAB",
      disabled: "#637381",
    },
    grey: {
      100: "#F9FAFB",
      200: "#F4F6F8",
      300: "#DFE3E8",
      400: "#C4CDD5",
      500: "#919EAB",
      600: "#637381",
      700: "#454F5B",
      800: "#212B36",
      900: "#161C24",
    },
  },
  typography: {
    fontFamily: "var(--font-public-sans), Public Sans, sans-serif",
    h1: {
      fontSize: "42px",
      fontWeight: 700,
      lineHeight: "54px",
    },
    h2: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "50px",
    },
    h3: {
      fontSize: "32px",
      fontWeight: 800,
      lineHeight: "48px",
    },
    h4: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: "36px",
    },
    h5: {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: "30px",
    },
    h6: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "28px",
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: "24px",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: "22px",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "22px",
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "24px",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "18px",
    },
    displayLarge: {
      fontSize: "48px",
      fontWeight: 800,
      lineHeight: "60px",
      letterSpacing: "-0.5px",
    },
    sectionTitle: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: "28px",
    },
    movieMeta: {
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: "22px",
    },
    scoreValue: {
      fontSize: "14px",
      fontWeight: 700,
      lineHeight: "1",
    },
  },
});
theme.components = Overrides(theme);

export default theme;
