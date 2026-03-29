import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '../factories/make-users-service';

export function useGetUserWithReadings(id: string | null) {
  const usersService = makeUsersService();

  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ['users', 'with-readings', id],
    queryFn: () => {
      if (!id) throw new Error('User id is required');
      return usersService.getWithReadings(id);
    },
  });

  return {
    userWithReadings: data,
    isLoadingUserWithReadings: isLoading,
  };
}
