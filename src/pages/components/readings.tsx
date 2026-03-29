import { cn } from '@/lib/utils';
import { genreLabels, readingStatusLabels } from '../labels';

import { StarIcon } from 'lucide-react';

import { Spinner } from '@/components/ui/spinner';
import { EditReadingDialog } from './edit-reading-dialog';
import { Skeleton } from '@/components/ui/skeleton';

import type { ReadingDetailsWithStatus } from '@/core/hooks/use-update-reading';

export type ReadingsProps = {
  user: {
    id: string | null;
    name?: string;
  };
  readings?: ReadingDetailsWithStatus[];
  isLoading: boolean;
};

export function Readings({ user, readings, isLoading }: ReadingsProps) {
  return (
    <div>
      {user.id && (
        <span>
          {isLoading ? 'Carregando leituras' : `Leituras de ${user?.name}`}
        </span>
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
        <div className="mt-4 flex flex-wrap gap-2">
          {readings?.map((reading) => (
            <div
              key={reading.id}
              className={cn(
                'flex w-full max-w-60 flex-col rounded-md border p-2 shadow-md',
                reading.fetchStatus === 'pending' && 'opacity-70',
                reading.fetchStatus === 'error' &&
                  'border-destructive/40 border',
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    title={reading.book.title}
                    className="text-primary max-w-40 truncate text-sm font-medium"
                  >
                    {reading.book.title}
                  </span>

                  {reading.fetchStatus === 'pending' && (
                    <Spinner className="size-3" />
                  )}
                </div>

                <EditReadingDialog
                  userId={user.id}
                  bookTitle={reading.book.title}
                  reading={{
                    id: reading.id,
                    status: reading.status,
                    rating: reading.rating,
                    fetchStatus: reading.fetchStatus,
                  }}
                />
              </div>

              <span className="text-sm">
                Autor:{' '}
                <strong className="font-medium">
                  {reading.book.author.name}
                </strong>
              </span>

              <div className="mt-2 flex flex-wrap gap-1">
                {reading.book.literaryGenres.map((genre) => (
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
                    reading.status === 'READ' && 'bg-green-100 text-green-600',
                    reading.status === 'WANT_TO_READ' &&
                      'bg-yellow-100 text-yellow-600',
                  )}
                >
                  {readingStatusLabels[reading.status]}
                </strong>

                <div className="mt-2 flex items-center gap-1">
                  {reading.rating ? (
                    Array.from({ length: reading.rating }, (_, i) => (
                      <StarIcon key={i} className="size-3 text-yellow-500" />
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">Sem avaliação</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
