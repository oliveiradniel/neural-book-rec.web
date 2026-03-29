import { useQuery } from '@tanstack/react-query';

import { makeUsersService } from '../factories/make-users-service';

export function useListOnlyUserNames() {
  const usersService = makeUsersService();

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'only-names'],
    queryFn: () => usersService.listOnlyNames(),
  });

  return {
    onlyUserNames: data ?? [],
    isLoadingOnlyUserNames: isLoading,
  };
}
