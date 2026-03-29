import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeBooksService } from '../factories/make-books-service';

import { USER_WITH_READINGS_QUERY_KEY } from './use-get-user-with-readings';

import type { UpdateReadingData } from '../domain/types/update-reading-data';
import type {
  ReadingBook,
  UserWithReadings,
} from '../domain/types/user-with-readings';
import type { WithStatus } from '@/types/with-status';

type UseUpdateReadingProps = {
  readingId: string;
  data: UpdateReadingData;
};

export type ReadingDetailsWithStatus = WithStatus<ReadingBook>;

export type UserCachedData = Omit<UserWithReadings, 'readings'> & {
  readings: ReadingDetailsWithStatus[];
};

export function useUpdateReading() {
  const booksService = makeBooksService();

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      readingId,
      data,
    }: UseUpdateReadingProps & { userId: string | null }) =>
      booksService.updateReading(readingId, data),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: USER_WITH_READINGS_QUERY_KEY(variables.userId),
      });

      const previousData = queryClient
        .getQueryData<UserWithReadings>(
          USER_WITH_READINGS_QUERY_KEY(variables.userId),
        )
        ?.readings.find((reading) => reading.id === variables.readingId);

      queryClient.setQueryData<UserCachedData>(
        USER_WITH_READINGS_QUERY_KEY(variables.userId),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            readings: old.readings.map((reading) => {
              if (reading.id !== variables.readingId) return reading;

              return {
                ...reading,
                status: variables.data.status,
                rating: variables.data.rating,
                fetchStatus: 'pending',
              };
            }),
          };
        },
      );

      return { previousData };
    },
    onSuccess: (_data, variables) => {
      const queryKey = USER_WITH_READINGS_QUERY_KEY(variables.userId);

      queryClient.setQueryData<UserCachedData>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          readings: old.readings.map((reading) => {
            if (reading.id !== variables.readingId) return reading;

            return {
              ...reading,
              fetchStatus: undefined,
            };
          }),
        };
      });
    },
    onError: async (_error, variables, context) => {
      const queryKey = USER_WITH_READINGS_QUERY_KEY(variables.userId);

      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData<UserCachedData>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          readings: old.readings.map((reading) => {
            if (reading.id !== variables.readingId) return reading;

            return {
              ...reading,
              ...context?.previousData,
              fetchStatus: 'error',
            };
          }),
        };
      });
    },
  });

  return {
    updateReading: mutateAsync,
    isUpdatingReading: isPending,
  };
}
