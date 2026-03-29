import type { Reading } from '../domain/entities/reading';
import type { UnreadBook } from '../domain/types/unread-book';
import type { UpdateReadingData } from '../domain/types/update-reading-data';

export abstract class IBooksService {
  abstract getUnreadBooksByUserId(userId: string): Promise<UnreadBook[]>;
  abstract updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading>;
}
