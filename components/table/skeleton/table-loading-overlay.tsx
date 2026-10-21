"use client";

import { Box } from "@mui/material";
import { GridLoadingOverlayProps } from "@mui/x-data-grid";
import { TableSkeleton } from "./table-skeleton";

declare module "@mui/x-data-grid" {
  interface LoadingOverlayPropsOverrides {
    cols: number;
    rows: number;
    rowHeight: number;
  }
}

type ITableLoadingOverlayProps = GridLoadingOverlayProps & {
  cols: number;
  rows: number;
  rowHeight: number;
};

const TableLoadingOverlay = ({
  cols,
  rows,
  rowHeight,
}: ITableLoadingOverlayProps) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    <TableSkeleton
      cols={cols}
      rows={rows}
      rowHeight={rowHeight}
      withFrame={false}
      withHeader={false}
    />
  </Box>
);

export { TableLoadingOverlay };
