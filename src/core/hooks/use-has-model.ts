import { useQuery } from '@tanstack/react-query';

import { makeAIService } from '../factories/make-ai-service';

export const HAS_MODEL_QUERY_KEY = ['model', 'exists'];

export function useHasModel() {
  const aiService = makeAIService();

  const { data, isPending } = useQuery({
    queryKey: HAS_MODEL_QUERY_KEY,
    queryFn: () => aiService.hasModel(),
  });

  return {
    hasModel: data,
    isChecking: isPending,
  };
}
