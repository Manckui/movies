import { Components, Theme, alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: object;
        columnHeaders?: object;
        row?: object;
        footerContainer?: object;
        containerTop?: object;
        withBorderColor?: object;
        columnSeparator?: object;
        toolbarContainer?: object;
      };
    };
  }
}

export default function DataGridOverrides(theme: Theme): Components {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
            borderRadius: "12px",
            backgroundColor: theme.palette.background.paper, 
            border: "none",
            borderWidth: 0,
            boxShadow: theme.shadows[5],
            "--DataGrid-containerBackground": alpha(theme.palette.text.secondary, 0.08), 
            '--DataGrid-rowBorderColor':  'transparent',

          ['& .MuiDataGrid-columnHeader']: {
            '&:focus-within': {
              outline: 'none',
            },
          },

          ['& .MuiDataGrid-cell']: {
            '&:focus-within': {
              outline: 'none',
            },
          },
        },
        toolbarContainer: {
            gap: 10,
            padding: 10,
        },
        columnHeaders: {
          color: theme.palette.text.secondary,
          fontSize: "13px",
          fontWeight: 600,
          lineHeight: "24px",
          border: "none",
          borderBottom: 0,

        },
        row: {
          color: theme.palette.text.primary,
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "22px",
          border: "none",
          minHeight: "60px",
          "&:hover": {
            backgroundColor: theme.palette.grey[800],
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
        },
        withBorderColor: {
            borderColor: alpha(theme.palette.text.secondary, 0.2),
        },
        columnSeparator: {
            color: alpha(theme.palette.text.secondary, 0.2),
          },
        footerContainer: {
          backgroundColor: theme.palette.background.paper,
          borderColor: alpha(theme.palette.text.secondary, 0.08),
          fontSize: "11px",
          "& svg": {
            fill: theme.palette.common.white, 
          },
          "& .Mui-disabled svg": {
            fill: alpha(theme.palette.text.secondary, 0.5), 
          },
        },
      },
    },
  };
}
