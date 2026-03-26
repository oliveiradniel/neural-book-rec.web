import { useMutation } from '@tanstack/react-query';

import { makeBooksService } from '../factories/make-books-service';

import type { UpdateReadingData } from '../domain/types/update-reading-data';

type UseUpdateReadingProps = {
  readingId: string;
  data: UpdateReadingData;
};

export function useUpdateReading() {
  const booksService = makeBooksService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ readingId, data }: UseUpdateReadingProps) =>
      booksService.updateReading(readingId, data),
  });

  return {
    updateReading: mutateAsync,
    isUpdatingReading: isPending,
  };
}
