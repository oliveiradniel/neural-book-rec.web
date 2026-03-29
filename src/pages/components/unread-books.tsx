import { genreLabels } from '../labels';

import { Skeleton } from '@/components/ui/skeleton';
import { CreateReadingDialog } from './create-reading-dialog';

import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import type { UnreadBook } from '@/core/domain/types/unread-book';
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { unreadBooksColumns } from '../home/unread-books-columns';
import { Input } from '@/components/ui/input';

export type UnreadBooksProps = {
  userId: string | null;
  isLoading: boolean;
  unreadBooks: UnreadBook[];
};

export function UnreadBooks({
  userId,
  isLoading,
  unreadBooks,
}: UnreadBooksProps) {
  const PAGE_SIZE = 8;

  const unreadBooksTable = useReactTable({
    data: unreadBooks,
    columns: unreadBooksColumns,
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

  const totalPages = unreadBooksTable.getPageCount();

  const titleColumn = unreadBooksTable.getColumn('title');
  const value = titleColumn?.getFilterValue() as string | undefined;

  return (
    <div>
      <div className="flex items-center justify-between">
        {userId && (
          <div className="flex items-center gap-4">
            <span className="text-xl">
              {isLoading ? 'Carregando livros' : 'Livros'}
            </span>

            <Input
              placeholder="Procurar pelo nome do livro"
              value={value ?? ''}
              onChange={(event) =>
                titleColumn?.setFilterValue(event.target.value)
              }
              className="min-w-80"
            />
          </div>
        )}

        {userId && (
          <div className="flex items-center gap-1">
            <span className="mr-3">
              Página {unreadBooksTable.getState().pagination.pageIndex + 1} de{' '}
              {totalPages}
            </span>

            <Button size="icon-sm" onClick={unreadBooksTable.firstPage}>
              <ChevronsLeft />
            </Button>

            <Button
              size="icon-sm"
              disabled={!unreadBooksTable.getCanPreviousPage()}
              onClick={unreadBooksTable.previousPage}
            >
              <ChevronLeft />
            </Button>

            <Button
              size="icon-sm"
              disabled={!unreadBooksTable.getCanNextPage()}
              onClick={unreadBooksTable.nextPage}
            >
              <ChevronRight />
            </Button>

            <Button size="icon-sm" onClick={unreadBooksTable.lastPage}>
              <ChevronsRight />
            </Button>
          </div>
        )}
      </div>

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
        <div className="mt-4 flex flex-wrap gap-2">
          {unreadBooksTable?.getRowModel().rows.map((row) => {
            const { id, title, author, literaryGenres, countActiveReadings } =
              row.original;

            return (
              <div
                key={id}
                className="flex w-full max-w-60 flex-col rounded-md border p-2 shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    title={title}
                    className="text-primary max-w-46 truncate text-sm font-medium"
                  >
                    {title}
                  </span>
                </div>

                <span className="text-sm">
                  Autor: <strong className="font-medium">{author.name}</strong>
                </span>

                <div className="mt-2 flex flex-wrap gap-1">
                  {literaryGenres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                    >
                      {genreLabels[genre.name]}
                    </span>
                  ))}
                </div>

                <span className="mt-2 text-xs">
                  Leituras ativas:{' '}
                  <strong className="text-primary">
                    {countActiveReadings}
                  </strong>
                </span>

                <div className="mt-2 flex flex-1 items-end gap-2">
                  <CreateReadingDialog
                    userId={userId}
                    book={{
                      id: id,
                      title: title,
                      authorName: author.name,
                      literaryGenres: literaryGenres.map(
                        (literaryGenre) => literaryGenre.name,
                      ),
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
