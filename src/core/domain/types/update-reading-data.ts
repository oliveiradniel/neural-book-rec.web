import type { Reading } from '../entities/reading';

export type UpdateReadingData = Pick<Reading, 'status' | 'rating'>;
