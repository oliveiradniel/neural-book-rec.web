import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeAIService } from '../factories/make-ai-service';

import { BOOK_RECOMMENDATIONS_QUERY_KEY } from './use-get-book-recommendations';
import { HAS_MODEL_QUERY_KEY } from './use-has-model';

export function useTrainModel(userId: string | null) {
  const queryClient = useQueryClient();

  const aiService = makeAIService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => aiService.trainModel(),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: BOOK_RECOMMENDATIONS_QUERY_KEY(userId),
        }),
        queryClient.invalidateQueries({
          queryKey: HAS_MODEL_QUERY_KEY,
        }),
      ]);
    },
  });

  return {
    trainModel: mutateAsync,
    isTrainingModel: isPending,
  };
}
