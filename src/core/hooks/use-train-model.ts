import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeAiService } from '../factories/make-ai-service';

import { BOOK_RECOMMENDATIONS_QUERY_KEY } from './use-get-book-recommendations';

export function useTrainModel(userId: string | null) {
  const queryClient = useQueryClient();

  const aiService = makeAiService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => aiService.trainModel(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BOOK_RECOMMENDATIONS_QUERY_KEY(userId),
      });
    },
  });

  return {
    trainModel: mutateAsync,
    isTrainingModel: isPending,
  };
}
