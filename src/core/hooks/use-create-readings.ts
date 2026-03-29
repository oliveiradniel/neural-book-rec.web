import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeBooksService } from '../factories/make-books-service';

import type { ReadingStatus } from '../domain/entities/reading';
import type { Genre } from '../domain/entities/literary-genre';
import type {
  ReadingBook,
  UserWithReadings,
} from '../domain/types/user-with-readings';
import type { UnreadBook } from '../domain/types/unread-book';
import type { UserCachedData } from './use-update-reading';

import { USER_WITH_READINGS_QUERY_KEY } from './use-get-user-with-readings';
import { UNREAD_BOOKS_QUERY_KEY } from './use-list-unread-books';

type UseCreateReadingProps = {
  userId: string;
  book: {
    id: string;
    title: string;
    authorName: string;
    literaryGenres: Genre[];
  };
  status: ReadingStatus;
  rating: number;
};

export function useCreateReading() {
  const queryClient = useQueryClient();

  const booksService = makeBooksService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ userId, book, status, rating }: UseCreateReadingProps) =>
      booksService.createReading(book.id, { userId, status, rating }),
    onMutate: async (variables) => {
      if (!variables.userId) throw new Error('User id is required');

      const userWithReadingsQueryKey = USER_WITH_READINGS_QUERY_KEY(
        variables.userId,
      ) as string[];
      const unreadBooksQueryKey = UNREAD_BOOKS_QUERY_KEY(
        variables.userId,
      ) as string[];

      await queryClient.cancelQueries({ queryKey: userWithReadingsQueryKey });
      await queryClient.cancelQueries({ queryKey: unreadBooksQueryKey });

      const previousDataUserWithReadings =
        queryClient.getQueryData<UserWithReadings>(userWithReadingsQueryKey);
      const previousDataUnreadBooks =
        queryClient.getQueryData<UnreadBook[]>(unreadBooksQueryKey);

      queryClient.setQueryData<UserCachedData>(
        userWithReadingsQueryKey,
        (old) => {
          if (!old) return old;

          const literaryGenres = variables.book.literaryGenres.map(
            (literaryGenre) => ({
              id: String(Math.random()),
              name: literaryGenre,
            }),
          );

          const newReading: ReadingBook = {
            id: String(Math.random()),
            book: {
              id: variables.book.id,

              title: variables.book.title,
              author: {
                id: String(Math.random()),
                name: variables.book.authorName,
              },
              literaryGenres,
            },
            status: variables.status,
            rating: variables.rating,
          };

          return {
            ...old,
            readings: [
              ...old.readings,
              { ...newReading, fetchStatus: 'pending' },
            ],
          };
        },
      );

      queryClient.setQueryData<UnreadBook[]>(unreadBooksQueryKey, (old) => {
        if (!old) return old;

        return old.filter((book) => book.id !== variables.book.id);
      });

      return {
        userWithReadingsQueryKey,
        unreadBooksQueryKey,
        previousDataUserWithReadings,
        previousDataUnreadBooks,
      };
    },
    onSuccess: (_data, variables) => {
      const queryKey = USER_WITH_READINGS_QUERY_KEY(variables.userId);

      queryClient.setQueryData<UserCachedData>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          readings: old.readings.map((reading) => ({
            ...reading,
            fetchStatus: undefined,
          })),
        };
      });
    },
    onError: async (_error, _variables, context) => {
      await queryClient.cancelQueries({
        queryKey: context?.userWithReadingsQueryKey,
      });
      await queryClient.cancelQueries({
        queryKey: context?.unreadBooksQueryKey,
      });

      queryClient.setQueryData<UnreadBook[]>(
        context!.unreadBooksQueryKey,
        (old) => {
          if (!old) return old;

          return context?.previousDataUnreadBooks;
        },
      );

      queryClient.setQueryData<UserWithReadings>(
        context!.userWithReadingsQueryKey,
        (old) => {
          if (!old) return old;

          return context?.previousDataUserWithReadings;
        },
      );
    },
  });

  return {
    createReading: mutateAsync,
    isCreatingReading: isPending,
  };
}
