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
          // La griglia è sempre contenuta in una Card: niente bordo/ombra propri.
          borderRadius: 0,
          backgroundColor: "transparent",
          border: "none",
          borderWidth: 0,
          boxShadow: "none",
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

          ["& .MuiDataGrid-columnHeaderTitle"]: {
            fontSize: "13px",
            fontWeight: 700,
            lineHeight: "22px",
          },
          ["& .MuiDataGrid-cell"]: {
            "&:focus-within": {
              outline: "none",
            },
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "22px",
          },
          ["& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell"]: {
            paddingLeft: "24px",
            paddingRight: "12px",
          },
          ["& .MuiDataGrid-actionsCell .MuiIconButton-root"]: {
            padding: "8px",
            cursor: "pointer",
            color: theme.palette.action.active,
          },
          ["& .MuiDataGrid-actionsCell svg"]: {
            fontSize: "2rem",
          },
          ["& .numeric-cell"]: {
            justifyContent: "flex-start",
            fontVariantNumeric: "tabular-nums",
            fontFeatureSettings: '"tnum" 1',
          },
          ["& .numeric-header .MuiDataGrid-columnHeaderTitleContainer"]: {
            justifyContent: "flex-start",
          },
          ["& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows"]:
            {
              fontSize: "14px",
            },
          ["& .MuiTablePagination-select"]: {
            display: "flex",
            alignItems: "center",
          },
          ["& .MuiTablePagination-selectIcon"]: {
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
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
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "22px",
          border: "none",
          minHeight: "76px",
          borderBottom: `1px dashed ${alpha(theme.palette.grey[500], 0.16)}`,
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.06),
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
          backgroundColor: "transparent",
          borderTop: "none",
          paddingLeft: "12px",
          paddingRight: "12px",
          fontSize: "14px",
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
