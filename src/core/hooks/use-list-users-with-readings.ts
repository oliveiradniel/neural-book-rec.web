import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '../factories/make-users-service';

export function useListUsersWithReadings() {
  const usersService = makeUsersService();

  const { data, isLoading } = useQuery({
    queryKey: ['users-with-readings'],
    queryFn: () => usersService.getUsersWithReadings(''),
  });

  return {
    usersWithReadings: data ?? [],
    isLoadingUsersWithReadings: isLoading,
  };
}
