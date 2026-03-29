import { useQuery } from '@tanstack/react-query';
import { makeBooksService } from '../factories/make-books-service';

export function useListUnreadBooks(id: string | null) {
  const booksService = makeBooksService();

  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ['books', 'unread', id],
    queryFn: () => {
      if (!id) throw new Error('User id is required');

      return booksService.getUnreadBooksByUserId(id);
    },
  });

  return {
    unreadBooks: data,
    isLoadingUnreadBooks: isLoading,
  };
}
