import type { Reading } from '../domain/entities/reading';
import type { CreateReadingData } from '../domain/types/create-reading-data';
import type { UnreadBook } from '../domain/types/unread-book';
import type { UpdateReadingData } from '../domain/types/update-reading-data';
import type { ReadingBook } from '../domain/types/user-with-readings';

export abstract class IBooksService {
  abstract getUnreadBooksByUserId(userId: string): Promise<UnreadBook[]>;
  abstract createReading(
    bookId: string,
    data: CreateReadingData,
  ): Promise<ReadingBook>;
  abstract updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading>;
}
