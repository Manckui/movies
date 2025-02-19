"use client";

import ArrowDownIcon from '@mui/icons-material/ArrowDownwardRounded'; // Icona di sorting
import ArrowUpIcon from '@mui/icons-material/ArrowUpwardRounded'; // Icona di sorting
import SortIcon from '@mui/icons-material/UnfoldMore'; // Icona di sorting

import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ITableProps } from './table.types';


const Table = (props: ITableProps) => {
  const {
    data,
    rows,
    rowCount,
    showSortableColumns = true,
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
            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
          >
            {params.colDef.headerName}
            <SortIcon style={{ opacity: 0.4, fontSize: 16 }} />
          </Typography>
        )
      : undefined,
  }));

  return (
    <>
      <DataGrid
        paginationMode="server"
        sortingMode="server"
        disableColumnMenu
        disableRowSelectionOnClick
        pageSizeOptions={pageSizeOptions}
        keepNonExistentRowsSelected
        slots={{
          columnSortedAscendingIcon: ArrowDownIcon,
          columnSortedDescendingIcon: ArrowUpIcon,
          columnUnsortedIcon: ArrowDownIcon,
        }}
        
        localeText={{
          noRowsLabel: "Nessun dato disponibile", 
        }}
        slotProps={{
          pagination: { labelRowsPerPage: "Righe per pagina" },
        }}
        {...props}
        columns={showSortableColumns ? enhancedColumns : props.columns}
        rows={actualRows}
        rowCount={data?.count || rowCount || 0}
      />
    </>
  );
};

export { Table };
