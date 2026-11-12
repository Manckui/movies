import { Components, Theme, alpha } from "@mui/material/styles";

// Superfici e componenti di supporto del redesign (card, chip, icone, rating).
export default function SurfacesOverrides(theme: Theme): Components {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: 20,
          backgroundImage: "none",
          backgroundColor: theme.palette.background.paper,
          boxShadow: `0 0 2px 0 ${alpha(theme.palette.common.black, 0.2)}, 0 12px 24px -4px ${alpha(theme.palette.common.black, 0.24)}`,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
          fontSize: "1.3rem",
        },
        sizeSmall: {
          height: 26,
          fontSize: "1.2rem",
        },
        filled: {
          backgroundColor: alpha(theme.palette.grey[500], 0.16),
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.32),
          color: theme.palette.grey[400],
        },
        colorSuccess: {
          "&.MuiChip-filled": {
            backgroundColor: alpha(theme.palette.success.main, 0.16),
            color: theme.palette.success.light,
          },
          "& .MuiChip-icon": { color: theme.palette.success.light },
        },
        colorWarning: {
          "&.MuiChip-filled": {
            backgroundColor: alpha(theme.palette.warning.main, 0.16),
            color: theme.palette.warning.main,
          },
        },
        deleteIcon: {
          fontSize: 16,
          color: theme.palette.grey[400],
        },
      },
    },
    // html usa font-size 62.5% (1rem = 10px): riallinea le dimensioni standard delle icone.
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: { fontSize: "2rem" },
        fontSizeMedium: { fontSize: "2.4rem" },
        fontSizeLarge: { fontSize: "3.5rem" },
      },
    },
    MuiRating: {
      styleOverrides: {
        sizeSmall: { fontSize: "1.6rem" },
        sizeMedium: { fontSize: "2.2rem" },
        sizeLarge: { fontSize: "3rem" },
        iconFilled: { color: theme.palette.warning.main },
        iconEmpty: { color: alpha(theme.palette.grey[500], 0.32) },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 4,
          backgroundColor: alpha(theme.palette.grey[500], 0.2),
        },
        bar: { borderRadius: 4 },
      },
    },
  };
}
