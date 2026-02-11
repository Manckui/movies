"use client";

import ArrowDownIcon from '@mui/icons-material/ArrowDownwardRounded'; // Icona di sorting
import ArrowUpIcon from '@mui/icons-material/ArrowUpwardRounded'; // Icona di sorting
import SortIcon from '@mui/icons-material/UnfoldMore'; // Icona di sorting

import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ITableProps } from './table.types';
import { TableSkeleton } from './skeleton/table-skeleton';
import { LandingSkeleton } from './skeleton/landing-skeleton';
import { useEffect } from 'react';
import { useLandingSkeleton } from './skeleton/use-landing-skeleton';


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

  const pageSizeOptions = [5, 10, 15, 20, 50];

  const actualRows = data?.items || rows || [];

  const enhancedColumns = props.columns.map(col => ({
    ...col,
    ...(!col.sortable && { sortable: false }),
    renderHeader: col.sortable
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (params: any) => (
          <Typography
            fontWeight="var(--unstable_DataGrid-headWeight)"
            variant="body2"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 17 }}
          >
            {params.colDef.headerName}
            <SortIcon style={{ opacity: 0.45, fontSize: 18 }} />
          </Typography>
        )
      : undefined,
  }));

  const { hasLanded, setLoading } = useLandingSkeleton();

  useEffect(() => {
    setLoading(Boolean(loading));
  }, [loading, setLoading]);

  const TableRowsLoadingOverlay = () => (
    <TableSkeleton
      cols={enhancedColumns.length}
      rows={skeletonRows}
      withFrame={false}
      withHeader={false}
    />
  );

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
        rowHeight={72}
        columnHeaderHeight={68}
        keepNonExistentRowsSelected
        slots={{
          loadingOverlay: TableRowsLoadingOverlay,
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
          pagination: { labelRowsPerPage: "Righe per pagina" },
          ...slotProps,
        }}
        {...restProps}
        loading={Boolean(loading)}
        columns={showSortableColumns ? enhancedColumns : props.columns}
        rows={actualRows}
        rowCount={data?.count || rowCount || 0}
      />
    </LandingSkeleton>
  );
};

export { Table };
