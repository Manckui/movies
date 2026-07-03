import { Components, Theme, alpha } from "@mui/material/styles";

export default function ButtonsOverrides(theme: Theme): Components {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none" as const,
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "24px",
          transition: "all 0.2s ease-in-out",
        },
        sizeSmall: {
          padding: "4px 14px",
          fontSize: "13px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "12px 28px",
          fontSize: "15px",
        },
        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        containedInfo: {
          backgroundColor: theme.palette.info.main,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: theme.palette.info.dark,
          },
        },
        outlinedPrimary: {
          border: `1.5px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          "&:hover": {
            border: `1.5px solid ${theme.palette.primary.main}`,
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
        outlinedInherit: {
          border: `1.5px solid ${alpha(theme.palette.text.primary, 0.24)}`,
          "&:hover": {
            border: `1.5px solid ${alpha(theme.palette.text.primary, 0.32)}`,
            backgroundColor: alpha(theme.palette.text.primary, 0.08),
          },
        },
      },
      variants: [
        {
          props: { variant: "soft" as never },
          style: {
            padding: "8px 20px",
            borderRadius: "8px",
            fontWeight: 700,
            textTransform: "none" as const,
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.28),
            },
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          transition: "all 0.2s ease-in-out",
        },
        sizeMedium: {
          width: 40,
          height: 40,
        },
        sizeSmall: {
          width: 32,
          height: 32,
        },
        sizeLarge: {
          width: 48,
          height: 48,
        },
      },
    },
  };
}
