import { useLayoutEffect, useState } from 'react';

import { useListOnlyUserNames } from '@/core/hooks/use-list-only-user-names';
import { useGetUserWithReadings } from '@/core/hooks/use-get-user-with-readings';
import { useListUnreadBooks } from '@/core/hooks/use-list-unread-books';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import { Separator } from '@/components/ui/separator';
import { Readings } from '../components/readings';
import { UnreadBooks } from '../components/unread-books';
import { UserSelect } from '../components/user-select';

export function Home() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { userWithReadings, isLoadingUserWithReadings } =
    useGetUserWithReadings(selectedUserId);
  const { onlyUserNames, isLoadingOnlyUserNames } = useListOnlyUserNames();

  const { unreadBooks, isLoadingUnreadBooks } =
    useListUnreadBooks(selectedUserId);

  useLayoutEffect(() => {
    if (onlyUserNames.length > 0) {
      setTimeout(() => {
        setSelectedUserId(onlyUserNames[1].id);
      });
    }
  }, [onlyUserNames]);

  return (
    <div className="h-screen w-screen overflow-x-hidden p-8">
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
            <UserSelect
              userId={selectedUserId}
              users={onlyUserNames}
              onChangeUserId={setSelectedUserId}
              isLoading={isLoadingOnlyUserNames}
            />

            {userWithReadings && <span>Idade: {userWithReadings.age}</span>}
          </div>

          <Separator />

          <Readings
            user={{
              id: selectedUserId,
              name: userWithReadings?.name,
            }}
            readings={userWithReadings?.readings}
            isLoading={isLoadingUserWithReadings}
          />

          <UnreadBooks
            userId={selectedUserId}
            unreadBooks={unreadBooks}
            isLoading={isLoadingUnreadBooks}
          />
        </CardContent>
      </Card>
    </div>
  );
}
