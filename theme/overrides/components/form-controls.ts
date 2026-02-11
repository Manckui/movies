import { Components, Theme, alpha } from "@mui/material/styles";
import { inputLabelClasses } from "@mui/material/InputLabel";

const BORDER_COLOR = alpha("#919EAB", 0.34);
const LABEL_COLOR = "#919EAB";
const TEXT_COLOR = "#ffffff";
const ICON_COLOR = "#637381";

export default function FormControlsOverrides(theme: Theme): Components {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: LABEL_COLOR,
          fontSize: "1.6rem",
          "&.Mui-focused": {
            color: LABEL_COLOR,
          },
          [`&.${inputLabelClasses.shrink}`]: {
            color: LABEL_COLOR,
            transform: "translate(12px, -8px) scale(0.78)",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: LABEL_COLOR,
          fontSize: "1.6rem",
          "&.Mui-focused": {
            color: LABEL_COLOR,
          },
          [`&.${inputLabelClasses.shrink}`]: {
            color: LABEL_COLOR,
            transform: "translate(12px, -8px) scale(0.78)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: TEXT_COLOR,
          backgroundColor: "transparent",
          minHeight: 56,
          borderRadius: 12,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: BORDER_COLOR,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#919EAB", 0.46),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#919EAB", 0.58),
          },
          "& .MuiSvgIcon-root": {
            color: ICON_COLOR,
          },
        },
        input: {
          color: TEXT_COLOR,
          "::placeholder": {
            color: LABEL_COLOR,
            opacity: 1,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          right: 12,
          width: 20,
          height: 20,
          color: ICON_COLOR,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 2,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiOutlinedInput-root": {
            minHeight: 56,
            borderRadius: 12,
          },
          "& .MuiOutlinedInput-input": {
            paddingTop: 0,
            paddingBottom: 0,
          },
          "& .MuiInputAdornment-root": {
            marginRight: 8,
          },
        },
        inputRoot: {
          "& .MuiAutocomplete-input": {
            color: TEXT_COLOR,
          },
          "& .MuiAutocomplete-endAdornment .MuiButtonBase-root": {
            color: ICON_COLOR,
          },
        },
        paper: {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.text.secondary, 0.2)}`,
          boxShadow: theme.shadows[8],
        },
        option: {
          color: theme.palette.text.primary,
          '&[aria-selected="true"]': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
          '&.Mui-focused': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
          },
        },
        endAdornment: {
          "& .MuiSvgIcon-root": {
            width: 20,
            height: 20,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
          },
          '&.Mui-selected:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.28),
          },
        },
      },
    },
  };
}
