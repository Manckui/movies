"use client";

import ArrowDownIcon from '@mui/icons-material/ArrowDownwardRounded'; // Icona di sorting
import ArrowUpIcon from '@mui/icons-material/ArrowUpwardRounded'; // Icona di sorting
import SortIcon from '@mui/icons-material/UnfoldMore'; // Icona di sorting

import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ITableProps } from './table.types';
import { TableSkeleton } from './skeleton/table-skeleton';
import { TableLoadingOverlay } from './skeleton/table-loading-overlay';
import { LandingSkeleton } from './skeleton/landing-skeleton';
import { useLandingSkeleton } from './skeleton/use-landing-skeleton';


const ROW_HEIGHT = 76;

const Table = (props: ITableProps) => {
  const {
    data,
    rows,
    rowCount,
    showSortableColumns = true,
    loading = false,
    enableLandingSkeleton = true,
    skeletonRows = 8,
    slots,
    slotProps,
    localeText,
    ...restProps
  } = props;

  const pageSizeOptions = [20];

  const actualRows = data?.items || rows || [];
  const paginationMode = restProps.paginationMode ?? 'server';

  const enhancedColumns = props.columns.map(col => ({
    ...col,
    minWidth: col.minWidth ?? 140,
    ...(!col.sortable && { sortable: false }),
    renderHeader: col.sortable
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (params: any) => (
          <Typography
            fontWeight="var(--unstable_DataGrid-headWeight)"
            variant="body2"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}
          >
            {params.colDef.headerName}
            <SortIcon style={{ opacity: 0.45, fontSize: 16 }} />
          </Typography>
        )
      : undefined,
  }));

  const hasLanded = useLandingSkeleton(loading);

  return (
    <LandingSkeleton
      loading={Boolean(loading) && enableLandingSkeleton}
      hasLanded={!enableLandingSkeleton || hasLanded}
      skeleton={<TableSkeleton cols={enhancedColumns.length} rows={skeletonRows} />}
    >
      <DataGrid
        paginationMode="server"
        sortingMode="server"
        disableColumnMenu
        disableRowSelectionOnClick
        pageSizeOptions={pageSizeOptions}
        initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
        rowHeight={ROW_HEIGHT}
        columnHeaderHeight={52}
        keepNonExistentRowsSelected
        slots={{
          loadingOverlay: TableLoadingOverlay,
          columnSortedAscendingIcon: ArrowDownIcon,
          columnSortedDescendingIcon: ArrowUpIcon,
          columnUnsortedIcon: ArrowDownIcon,
          ...slots,
        }}
        
        localeText={{
          noRowsLabel: 'Nessun dato disponibile',
          ...localeText,
        }}
        slotProps={{
          pagination: {
            labelRowsPerPage: "Righe per pagina",
            labelDisplayedRows: ({ from, to, count }) =>
              `${from}–${to} di ${count !== -1 ? count.toLocaleString("it-IT") : `più di ${to}`}`,
          },
          ...slotProps,
          loadingOverlay: {
            cols: enhancedColumns.length,
            rows: restProps.paginationModel?.pageSize ?? skeletonRows,
            rowHeight: ROW_HEIGHT,
            ...slotProps?.loadingOverlay,
          },
        }}
        {...restProps}
        loading={Boolean(loading)}
        columns={showSortableColumns ? enhancedColumns : props.columns}
        rows={actualRows}
        {...(paginationMode === 'server' && {
          rowCount: data?.count || rowCount || 0,
        })}
      />
    </LandingSkeleton>
  );
};

export { Table };
