import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '../factories/make-users-service';

export const USERS_WITH_READINGS_QUERY_KEY = ['users-with-readings'];

export function useListUsersWithReadings() {
  const usersService = makeUsersService();

  const { data, isLoading } = useQuery({
    queryKey: USERS_WITH_READINGS_QUERY_KEY,
    queryFn: () => usersService.getUsersWithReadings(),
  });

  return {
    usersWithReadings: data ?? [],
    isLoadingUsersWithReadings: isLoading,
  };
}
