import { Components, Theme } from "@mui/material/styles";
import DataGridOverrides from "./components/data-grid";
import FormControlsOverrides from "./components/form-controls";
import ButtonsOverrides from "./components/buttons";

export default function Overrides(theme: Theme): Components {
  return {
    ...DataGridOverrides(theme),
    ...FormControlsOverrides(theme),
    ...ButtonsOverrides(theme),
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayLarge: "h1",
          sectionTitle: "h2",
          movieMeta: "p",
          scoreValue: "span",
        },
      },
    },
  };
}
