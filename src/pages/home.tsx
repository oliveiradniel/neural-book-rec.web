import { useEffect, useState } from 'react';

import { useListUsersWithReadings } from '../core/hooks/use-list-users-with-readings';

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
import { Separator } from '@/components/ui/separator';

import type { UserWithReadings } from '@/core/domain/types/user-with-readings';
import type { ReadingStatus } from '@/core/domain/entities/reading';
import type { Genre } from '@/core/domain/entities/literary-genre';

export function Home() {
  const { usersWithReadings, isLoadingUsersWithReadings } =
    useListUsersWithReadings();

  const [selectedUser, setSelectedUser] = useState<UserWithReadings | null>(
    null,
  );

  useEffect(() => {
    if (usersWithReadings.length > 0 && !selectedUser) {
      setSelectedUser(usersWithReadings[1]);
    }
  }, [usersWithReadings, selectedUser]);

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

  const selectUserPlaceholder = isLoadingUsersWithReadings
    ? 'Carregando usuários...'
    : selectedUser?.name || 'Selecione um usuário';

  const userAge = isLoadingUsersWithReadings
    ? '...'
    : selectedUser?.age || '...';

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
          {!isLoadingUsersWithReadings && usersWithReadings.length === 0 && (
            <span className="text-base font-medium">
              Nenhum usuário encontrado. Por favor, adicione usuários para
              visualizar suas leituras.
            </span>
          )}

          <div className="flex items-center gap-4">
            <Select
              defaultValue={selectedUser?.id}
              onValueChange={(value) => {
                const user = usersWithReadings.find(
                  (user) => user.id === value,
                );

                setSelectedUser(user || null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectUserPlaceholder} />
              </SelectTrigger>

              <SelectContent position="popper">
                {usersWithReadings.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span>Idade: {userAge}</span>
          </div>

          <Separator />

          <div>
            <span>
              {isLoadingUsersWithReadings
                ? 'Carregando leituras...'
                : `Leituras de ${selectedUser?.name}`}
            </span>

            {isLoadingUsersWithReadings && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map(() => (
                  <Skeleton
                    id={crypto.randomUUID()}
                    className="flex h-26 w-full max-w-60 flex-col rounded-md"
                  />
                ))}
              </div>
            )}

            {!isLoadingUsersWithReadings && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedUser?.readings.map((reading) => (
                  <div
                    key={reading.title}
                    className="flex w-full max-w-60 flex-col rounded-md border p-2 shadow-md"
                  >
                    <span
                      title={reading.title}
                      className="text-primary max-w-50 truncate text-sm font-medium"
                    >
                      {reading.title}
                    </span>

                    <span className="text-sm">
                      Autor:{' '}
                      <strong className="font-medium">{reading.author}</strong>
                    </span>

                    <div className="mt-2 flex gap-1">
                      {reading.literaryGenres.map((genre) => (
                        <span
                          key={genre}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800"
                        >
                          {genreLabels[genre]}
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
