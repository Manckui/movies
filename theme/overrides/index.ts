import { Components, Theme } from "@mui/material/styles";
import DataGridOverrides from "./components/data-grid";
import FormControlsOverrides from "./components/form-controls";

export default function Overrides(theme: Theme): Components {
  return {
    ...DataGridOverrides(theme),
    ...FormControlsOverrides(theme),
  };
}
