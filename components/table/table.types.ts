import { DataGridProps } from '@mui/x-data-grid';
import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITableProps<ITEMS = any> extends Omit<DataGridProps, 'rows'> {
  showSortableColumns?: boolean;
  enableLandingSkeleton?: boolean;
  skeletonRows?: number;
  rows?: DataGridProps['rows'];
  data?: {
    count: number;
    items: ITEMS[];
  } | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITableWithFiltersProps<T = any> extends ITableProps<T> {
  filterComponent: ReactNode;
}
