import { useState } from 'react';

import { useListOnlyUserNames } from '@/core/hooks/use-list-only-user-names';
import { useGetUserWithReadings } from '@/core/hooks/use-get-user-with-readings';

import { cn } from '@/lib/utils';

import { StarIcon } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { EditReadingDialog } from './components/edit-reading-dialog';
import { Separator } from '@/components/ui/separator';

import { ReadingStatus } from '@/core/domain/entities/reading';
import { Genre } from '@/core/domain/entities/literary-genre';
import { Spinner } from '@/components/ui/spinner';

export function Home() {
  const { onlyUserNames, isLoadingOnlyUserNames } = useListOnlyUserNames();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { userWithReadings, isLoadingUserWithReadings } =
    useGetUserWithReadings(selectedUserId);

  const readingStatusLabels: Record<ReadingStatus, string> = {
    READ: 'Concluído',
    WANT_TO_READ: 'Quero ler',
  };

  const genreLabels: Record<Genre, string> = {
    FANTASY: 'Fantasia',
    SCIENCE_FICTION: 'Ficção Científica',
    ROMANCE: 'Romance',
    HORROR: 'Terror',
    THRILLER: 'Suspense',
    MYSTERY: 'Mistério',
    ADVENTURE: 'Aventura',
    DRAMA: 'Drama',
    HISTORICAL_FICTION: 'Ficção Histórica',
    DYSTOPIA: 'Distopia',
    BIOGRAPHY: 'Biografia',
    PHILOSOPHY: 'Filosofia',
    SELF_HELP: 'Autoajuda',
    BUSINESS: 'Negócios',
    SCIENCE: 'Ciência',
    TECHNOLOGY: 'Tecnologia',
    POETRY: 'Poesia',
    CHILDREN: 'Infantil',
  };

  const selectUserPlaceholder = isLoadingOnlyUserNames
    ? 'Carregando usuários...'
    : selectedUserId || 'Selecione um usuário';

  return (
    <div className="h-screen w-screen p-8">
      <h1 className="text-4xl font-medium">
        Seja bem-vindo ao <span className="text-primary">Neural Book Rec</span>
      </h1>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Seleção de Usuários</CardTitle>
          <CardDescription>
            Selecione um usuário para visualizar suas leituras e receber
            recomendações personalizadas.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          {!isLoadingOnlyUserNames && onlyUserNames.length === 0 && (
            <span className="text-base font-medium">
              Nenhum usuário encontrado. Por favor, adicione usuários para
              visualizar suas leituras.
            </span>
          )}

          <div className="flex items-center gap-4">
            <Select
              disabled={!onlyUserNames || isLoadingOnlyUserNames}
              onValueChange={(value) => setSelectedUserId(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectUserPlaceholder} />
              </SelectTrigger>

              <SelectContent position="popper">
                {onlyUserNames?.map((user) => (
                  <SelectItem
                    key={user.id}
                    value={user.id}
                    className={cn(
                      user.id === selectedUserId &&
                        'bg-accent text-accent-foreground',
                    )}
                  >
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {userWithReadings && <span>Idade: {userWithReadings.age}</span>}
          </div>

          <Separator />

          <div>
            {selectedUserId && (
              <span>
                {isLoadingUserWithReadings
                  ? 'Carregando leituras'
                  : `Leituras de ${userWithReadings?.name}`}
              </span>
            )}

            {isLoadingUserWithReadings && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton
                    key={`skeleton-book-${index}`}
                    className="flex h-26 w-full max-w-60 flex-col rounded-md"
                  />
                ))}
              </div>
            )}

            {!isLoadingUserWithReadings && (
              <div className="mt-4 flex flex-wrap gap-2">
                {userWithReadings?.readings.map((reading) => (
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
                          className="text-primary max-w-46 truncate text-sm font-medium"
                        >
                          {reading.book.title}
                        </span>

                        {reading.fetchStatus === 'pending' && (
                          <Spinner className="size-3" />
                        )}
                      </div>

                      <EditReadingDialog
                        userId={selectedUserId}
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

                    <div className="mt-2 flex gap-1">
                      {reading.book.literaryGenres.map((genre) => (
                        <span
                          key={genre.id}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                        >
                          {genreLabels[genre.name]}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2">
                      <strong
                        className={cn(
                          'rounded-full px-2 py-1 text-xs font-medium',
                          reading.status === 'READ' &&
                            'bg-green-100 text-green-600',
                          reading.status === 'WANT_TO_READ' &&
                            'bg-yellow-100 text-yellow-600',
                        )}
                      >
                        {readingStatusLabels[reading.status]}
                      </strong>
                    </div>

                    <div className="mt-2 flex items-center gap-1">
                      {reading.rating ? (
                        Array.from({ length: reading.rating }, (_, i) => (
                          <StarIcon
                            key={i}
                            className="size-3 text-yellow-500"
                          />
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">
                          Sem avaliação
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
