"use client";

import { Box, Skeleton } from '@mui/material';

interface ITableSkeletonProps {
  cols: number;
  rows?: number;
  withFrame?: boolean;
  withHeader?: boolean;
}

const TableSkeleton = ({
  cols,
  rows = 8,
  withFrame = true,
  withHeader = true,
}: ITableSkeletonProps) => {
  const safeCols = Math.max(1, cols);

  const content = (
    <>
      {withHeader ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${safeCols}, 1fr)`,
            gap: 1,
            p: 1.2,
            borderBottom: theme => `1px solid ${theme.palette.divider}`,
            backgroundColor: theme => theme.palette.background.default,
          }}
        >
          {Array.from({ length: safeCols }).map((_, index) => (
            <Skeleton
              key={`head-${index}`}
              variant="rounded"
              height={20}
              animation="wave"
            />
          ))}
        </Box>
      ) : null}

      <Box sx={{ p: 1.2, display: 'grid', gap: 1 }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box
            key={`row-${rowIndex}`}
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${safeCols}, 1fr)`,
              gap: 1,
            }}
          >
            {Array.from({ length: safeCols }).map((__, colIndex) => (
              <Skeleton
                key={`cell-${rowIndex}-${colIndex}`}
                variant="rounded"
                height={30}
                animation="wave"
                sx={{ opacity: colIndex === safeCols - 1 ? 0.75 : 1 }}
              />
            ))}
          </Box>
        ))}
      </Box>
    </>
  );

  if (!withFrame) return <Box sx={{ width: '100%' }}>{content}</Box>;

  return (
    <Box
      sx={{
        border: theme => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: theme => theme.palette.background.paper,
      }}
    >
      {content}
    </Box>
  );
};

export { TableSkeleton };
export type { ITableSkeletonProps };
