import type { UnreadBook } from '@/core/domain/types/unread-book';
import type { ColumnDef } from '@tanstack/react-table';

export const unreadBooksColumns: ColumnDef<UnreadBook>[] = [
  {
    accessorKey: 'title',
  },
  {
    accessorKey: 'author',
  },
  {
    accessorKey: 'literaryGenres',
  },
  {
    accessorKey: 'countActiveReadings',
  },
];
