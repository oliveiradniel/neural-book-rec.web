import { genreLabels } from '../labels';

import { Skeleton } from '@/components/ui/skeleton';
import { CreateReadingDialog } from './create-reading-dialog';

import type { UnreadBook } from '@/core/domain/types/unread-book';

export type UnreadBooksProps = {
  userId: string | null;
  unreadBooks?: UnreadBook[];
  isLoading: boolean;
};

export function UnreadBooks({
  userId,
  unreadBooks,
  isLoading,
}: UnreadBooksProps) {
  return (
    <div>
      {userId && <span>{isLoading ? 'Carregando livros' : 'Livros'}</span>}

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
          {unreadBooks?.map((book) => (
            <div
              key={book.id}
              className="flex w-full max-w-60 flex-col rounded-md border p-2 shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  title={book.title}
                  className="text-primary max-w-46 truncate text-sm font-medium"
                >
                  {book.title}
                </span>
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

              <span className="mt-2 text-xs">
                Leituras ativas:{' '}
                <strong className="text-primary">
                  {book.countActiveReadings}
                </strong>
              </span>

              <div className="mt-2 flex flex-1 items-end gap-2">
                <CreateReadingDialog
                  userId={userId}
                  book={{
                    id: book.id,
                    title: book.title,
                    authorName: book.author.name,
                    literaryGenres: book.literaryGenres.map(
                      (literaryGenre) => literaryGenre.name,
                    ),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
