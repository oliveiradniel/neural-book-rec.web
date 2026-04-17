import { useQuery } from '@tanstack/react-query';
import { makeAiService } from '../factories/make-ai-service';

export function useGetBookRecommendations(userId: string | null) {
  const aiService = makeAiService();

  const { data, isLoading } = useQuery({
    enabled: !!userId,
    queryKey: ['book', 'recommendations', userId],
    queryFn: () => {
      if (!userId) throw new Error('User id is required');

      return aiService.getBookRecommendations(userId);
    },
  });

  return {
    bookRecommendations: data ?? [],
    isLoadingBookRecommendations: isLoading,
  };
}
