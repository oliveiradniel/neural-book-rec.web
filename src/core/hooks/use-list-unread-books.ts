import { useQuery } from '@tanstack/react-query';

import { makeBooksService } from '../factories/make-books-service';

export const UNREAD_BOOKS_QUERY_KEY = (userId: string | null) => [
  'books',
  'unread',
  userId,
];

export function useListUnreadBooks(userId: string | null) {
  const booksService = makeBooksService();

  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: UNREAD_BOOKS_QUERY_KEY(userId),
    queryFn: () => {
      if (!userId) throw new Error('User id is required');

      return booksService.getUnreadBooksByUserId(userId);
    },
  });

  return {
    unreadBooks: data,
    isLoadingUnreadBooks: isLoading,
  };
}
