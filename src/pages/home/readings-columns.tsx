import type { ReadingDetailsWithStatus } from '@/core/hooks/use-update-reading';
import type { ColumnDef } from '@tanstack/react-table';

export const readingsColumns: ColumnDef<ReadingDetailsWithStatus>[] = [
  {
    accessorKey: 'title',
    accessorFn: (row) => row.book.title,
  },
  {
    accessorKey: 'author',
    accessorFn: (row) => row.book.author,
  },
  {
    accessorKey: 'literaryGenres',
    accessorFn: (row) => row.book.literaryGenres,
  },
];
