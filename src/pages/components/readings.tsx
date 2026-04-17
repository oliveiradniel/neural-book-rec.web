import { cn } from '@/lib/utils';
import { genreLabels, readingStatusLabels } from '../labels';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  StarIcon,
} from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';
import { EditReadingDialog } from './edit-reading-dialog';
import { Skeleton } from '@/components/ui/skeleton';

import type { ReadingDetailsWithStatus } from '@/core/hooks/use-update-reading';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { readingsColumns } from '../home/readings-columns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type ReadingsProps = {
  user: {
    id: string | null;
    name?: string;
  };
  readings: ReadingDetailsWithStatus[];
  isLoading: boolean;
};

export function Readings({ user, readings, isLoading }: ReadingsProps) {
  const PAGE_SIZE = 8;

  const readingsTable = useReactTable({
    data: readings,
    columns: readingsColumns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const totalPages = readingsTable.getPageCount();

  const titleColumn = readingsTable.getColumn('title');
  const value = titleColumn?.getFilterValue() as string | undefined;

  return (
    <div>
      {user.id && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xl">
              {isLoading ? 'Carregando leituras' : `Leituras de ${user?.name}`}
            </span>

            <Input
              placeholder="Procurar pelo nome do livro"
              value={value ?? ''}
              onChange={(event) =>
                titleColumn?.setFilterValue(event.target.value)
              }
              className="min-w-80 flex-1"
            />
          </div>

          <div className="flex items-center gap-1">
            <span className="mr-3">
              Página {readingsTable.getState().pagination.pageIndex + 1} de{' '}
              {totalPages}
            </span>

            <Button size="icon-sm" onClick={readingsTable.firstPage}>
              <ChevronsLeft />
            </Button>

            <Button
              size="icon-sm"
              disabled={!readingsTable.getCanPreviousPage()}
              onClick={readingsTable.previousPage}
            >
              <ChevronLeft />
            </Button>

            <Button
              size="icon-sm"
              disabled={!readingsTable.getCanNextPage()}
              onClick={readingsTable.nextPage}
            >
              <ChevronRight />
            </Button>

            <Button size="icon-sm" onClick={readingsTable.lastPage}>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`skeleton-book-${index}`}
              className="flex h-26 w-full max-w-60 flex-col rounded-md"
            />
          ))}
        </div>
      )}

      {!isLoading && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {readingsTable.getRowModel().rows.map((row) => {
            const { id, fetchStatus, book, status, rating } = row.original;

            return (
              <div
                key={id}
                className={cn(
                  'flex w-full flex-col rounded-md border p-2 shadow-md',
                  fetchStatus === 'pending' && 'opacity-70',
                  fetchStatus === 'error' && 'border-destructive/40 border',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      title={book.title}
                      className="text-primary max-w-40 truncate text-sm font-medium"
                    >
                      {book.title}
                    </span>

                    {fetchStatus === 'pending' && (
                      <Spinner className="size-3" />
                    )}
                  </div>

                  <EditReadingDialog
                    userId={user.id}
                    bookTitle={book.title}
                    reading={{
                      id: id,
                      status: status,
                      rating: rating,
                      fetchStatus: fetchStatus,
                    }}
                  />
                </div>

                <span className="text-sm">
                  Autor:{' '}
                  <strong className="font-medium">{book.author.name}</strong>
                </span>

                <div className="mt-2 flex flex-wrap gap-1">
                  {book.literaryGenres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                    >
                      {genreLabels[genre.name]}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex flex-1 items-end justify-between">
                  <strong
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      status === 'READ' && 'bg-green-100 text-green-600',
                      status === 'WANT_TO_READ' &&
                        'bg-yellow-100 text-yellow-600',
                    )}
                  >
                    {readingStatusLabels[status]}
                  </strong>

                  <div className="mt-2 flex items-center gap-1">
                    {rating ? (
                      Array.from({ length: rating }, (_, i) => (
                        <StarIcon key={i} className="size-3 text-yellow-500" />
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">
                        Sem avaliação
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
