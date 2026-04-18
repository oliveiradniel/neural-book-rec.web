import type { BookRecommendation } from '../domain/types/book-recommendation';

export abstract class IAIService {
  abstract getBookRecommendations(
    userId: string,
  ): Promise<BookRecommendation[]>;
  abstract hasModel(): Promise<boolean>;
  abstract trainModel(): Promise<void>;
}
