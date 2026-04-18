import { useQuery } from '@tanstack/react-query';
import { makeAIService } from '../factories/make-ai-service';

export const BOOK_RECOMMENDATIONS_QUERY_KEY = (userId: string | null) => {
  return ['book', 'recommendations', userId];
};

export function useGetBookRecommendations(userId: string | null) {
  const aiService = makeAIService();

  const { data, isLoading, isFetching } = useQuery({
    enabled: !!userId,
    queryKey: BOOK_RECOMMENDATIONS_QUERY_KEY(userId),
    queryFn: () => {
      if (!userId) throw new Error('User id is required');

      return aiService.getBookRecommendations(userId);
    },
  });

  return {
    bookRecommendations: data ?? [],
    isLoadingBookRecommendations: isLoading,
    isFetchingBookRecommendations: isFetching,
  };
}
