import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '../factories/make-users-service';

import type { UserCachedData } from './use-update-reading';

export const USER_WITH_READINGS_QUERY_KEY = (id: string | null) => [
  'users',
  'with-readings',
  id,
];

export function useGetUserWithReadings(id: string | null) {
  const usersService = makeUsersService();

  const { data, isLoading } = useQuery<UserCachedData>({
    enabled: !!id,
    queryKey: USER_WITH_READINGS_QUERY_KEY(id),
    queryFn: () => {
      if (!id) throw new Error('User id is required');

      return usersService.getWithReadings(id);
    },
  });

  return {
    userWithReadings: {
      ...data,
      readings: data?.readings ?? [],
    },
    isLoadingUserWithReadings: isLoading,
  };
}
