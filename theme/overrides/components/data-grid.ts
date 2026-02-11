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
          "--DataGrid-containerBackground": alpha(
            theme.palette.text.secondary,
            0.08
          ),
          "--DataGrid-rowBorderColor": "transparent",

          ["& .MuiDataGrid-columnHeader"]: {
            "&:focus-within": {
              outline: "none",
            },
          },

          ["& .MuiDataGrid-cell"]: {
            "&:focus-within": {
              outline: "none",
            },
          },
          ["& .MuiDataGrid-columnHeaderTitle"]: {
            fontSize: "17px",
            fontWeight: 700,
            lineHeight: "24px",
          },
          ["& .MuiDataGrid-cellContent"]: {
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: "22px",
          },
          ["& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell"]: {
            paddingLeft: "16px",
            paddingRight: "16px",
          },
          ["& .MuiDataGrid-actionsCell .MuiIconButton-root"]: {
            padding: "8px",
            cursor: "pointer",
          },
          ["& .MuiDataGrid-actionsCell svg"]: {
            fontSize: "2.2rem",
          },
          ["& .numeric-cell"]: {
            justifyContent: "flex-end",
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum" 1',
          },
          ["& .numeric-header .MuiDataGrid-columnHeaderTitleContainer"]: {
            justifyContent: "flex-end",
          },
          ["& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows"]:
            {
              fontSize: "15px",
            },
        },
        toolbarContainer: {
          gap: 10,
          padding: 10,
        },
        columnHeaders: {
          color: theme.palette.text.secondary,
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          border: "none",
          borderBottom: 0,
        },
        row: {
          color: theme.palette.text.primary,
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: "24px",
          border: "none",
          minHeight: "72px",
          "&:nth-of-type(odd)": {
            backgroundColor: alpha(theme.palette.background.paper, 0.72),
          },
          "&:nth-of-type(even)": {
            backgroundColor: alpha(theme.palette.background.paper, 0.96),
          },
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
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
          fontSize: "16px",
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
