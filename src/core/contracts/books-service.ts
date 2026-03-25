import type { Reading } from '../domain/entities/reading';
import type { UpdateReadingData } from '../domain/types/update-reading-data';

export abstract class IBooksService {
  abstract updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading>;
}
