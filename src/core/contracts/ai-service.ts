import type { BookRecommendation } from '../domain/types/book-recommendation';

export abstract class IAIService {
  abstract getBookRecommendations(
    userId: string,
  ): Promise<BookRecommendation[]>;
  abstract trainModel(): Promise<void>;
}
