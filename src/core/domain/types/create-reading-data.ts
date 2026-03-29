import type { Reading, ReadingStatus } from '../entities/reading';

export type CreateReadingData = Pick<Reading, 'status' | 'rating'> & {
  userId: string;
  status: ReadingStatus;
  rating: number;
};
