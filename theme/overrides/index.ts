import { Components, Theme } from "@mui/material/styles";
import DataGridOverrides from "./components/data-grid";

export default function Overrides(theme: Theme): Components {
  return {
    ...DataGridOverrides(theme), 
  };
}
