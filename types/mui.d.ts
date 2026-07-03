import "@mui/material/styles";
import "@mui/material/Typography";
import "@mui/material/Button";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    displayLarge: React.CSSProperties;
    sectionTitle: React.CSSProperties;
    movieMeta: React.CSSProperties;
    scoreValue: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    displayLarge?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
    movieMeta?: React.CSSProperties;
    scoreValue?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    sectionTitle: true;
    movieMeta: true;
    scoreValue: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}
