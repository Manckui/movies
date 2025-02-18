import { IPaginationFilters } from '@/utils';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export type BaseTableState = {
  selections?: GridRowSelectionModel;
  page?: IPaginationFilters['page'];
  pageSize?: IPaginationFilters['pageSize'];
  sortBy?: string;
  sortOrder?: string;
};

export type UseTableProps<FILTERS> = TableState<FILTERS>;

export type TableState<FILTERS> = FILTERS & BaseTableState;

