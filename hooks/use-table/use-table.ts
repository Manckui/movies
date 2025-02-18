import { DataGridProps } from '@mui/x-data-grid';
import { useState } from 'react';
import {  TableState, UseTableProps } from '.';
import { SortOrder, tablePageSizeOption } from '@/utils';

export const useTable = <FILTERS>(
  initialState: UseTableProps<FILTERS> = {
    page: 1,
    pageSize: tablePageSizeOption[0] as number,
  } as TableState<FILTERS>
) => {
  const [tableState, setTableState] =
    useState<TableState<FILTERS>>(initialState);

  const onRowSelectionModelChange: DataGridProps['onRowSelectionModelChange'] =
    model => {
      setTableState(prev => ({ ...prev, selections: model }));
    };

  const onSortModelChange: DataGridProps['onSortModelChange'] = ([model]) => {
    setTableState(prev => ({
      ...prev,
      sortBy: model?.field,
      sortOrder: model?.sort as SortOrder,
      page: 1,
    }));
  };

  const onPaginationModelChange: DataGridProps['onPaginationModelChange'] = ({
    page,
    pageSize,
  }) => {
    setTableState(prev => ({ ...prev, page: page + 1, pageSize }));
  };

  const tableMethods = {
    onSortModelChange,
    onPaginationModelChange,
    onRowSelectionModelChange,
  };

  return {
    tableState,
    setTableState,
    tableMethods,
    tableProps: {
      rowSelectionModel: tableState.selections,
      paginationModel: {
        page: tableState.page ? tableState.page - 1 : 1,
        pageSize: tableState.pageSize || (tablePageSizeOption[0] as number),
      },
      ...tableMethods,
    },
  };
};
