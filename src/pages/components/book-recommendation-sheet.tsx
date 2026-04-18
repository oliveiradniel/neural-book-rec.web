import { useGetBookRecommendations } from '@/core/hooks/use-get-book-recommendations';

import { genreLabels } from '../labels';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CreateReadingDialog } from './create-reading-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

type BookRecommendationProps = {
  userId: string | null;
  disabled: boolean;
};

export function BookRecommendationSheet({
  userId,
  disabled,
}: BookRecommendationProps) {
  const {
    bookRecommendations,
    isLoadingBookRecommendations,
    isFetchingBookRecommendations,
  } = useGetBookRecommendations(userId);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button disabled={disabled}>Ver recomendações</Button>
      </SheetTrigger>

      <SheetContent className="min-w-120">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            TOP 10 Recomendações {isFetchingBookRecommendations && <Spinner />}
          </SheetTitle>
          <SheetDescription>
            De acordo com seu perfil e leituras recomendamos estes livros que
            você possa gostar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 overflow-y-auto px-4">
          {isLoadingBookRecommendations &&
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`recommendations-skeleton-${index}`}
                className="h-40 w-full"
              />
            ))}

          {isFetchingBookRecommendations && (
            <span className="animate-pulse text-sm">
              Carregando novas recomendações...
            </span>
          )}

          {!isLoadingBookRecommendations &&
            bookRecommendations?.map(
              ({
                id,
                title,
                author,
                literaryGenres,
                countActiveReadings,
                score,
              }) => {
                const percent = `${score * 100}%`;

                return (
                  <div
                    key={id}
                    className="flex w-full flex-col rounded-md border p-2 shadow-md"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        title={title}
                        className="text-primary text-sm font-medium"
                      >
                        {title}
                      </span>
                    </div>

                    <span className="text-sm">
                      Autor: <strong className="font-medium">{author}</strong>
                    </span>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {literaryGenres.map((genre) => (
                        <span
                          key={`literary-genre-recommendation-${genre}`}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                        >
                          {genreLabels[genre]}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 flex items-end gap-2">
                      <div className="flex-1">
                        <span className="mt-2 flex items-end gap-1 text-xs">
                          Leituras ativas:
                          <strong className="text-primary">
                            {countActiveReadings}
                          </strong>
                        </span>

                        <span className="mt-2 flex items-end gap-1 text-xs">
                          Compatibilidade:
                          <strong className="text-primary">{percent}</strong>
                        </span>
                      </div>

                      <CreateReadingDialog
                        userId={userId}
                        book={{
                          id: id,
                          title: title,
                          authorName: author,
                          literaryGenres: literaryGenres.map(
                            (literaryGenre) => literaryGenre,
                          ),
                        }}
                      />
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
