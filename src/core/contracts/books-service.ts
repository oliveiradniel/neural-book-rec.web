import type { Book } from '../domain/entities/book';
import type { Reading } from '../domain/entities/reading';
import type { UpdateReadingData } from '../domain/types/update-reading-data';

export abstract class IBooksService {
  abstract getUnreadBooksByUserId(userId: string): Promise<Book[]>;
  abstract updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading>;
}
