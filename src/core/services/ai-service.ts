import type { IAIService } from '../contracts/ai-service';
import type { IHttpClient } from '../contracts/http-client';
import type { BookRecommendation } from '../domain/types/book-recommendation';

export class AIService implements IAIService {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getBookRecommendations(userId: string): Promise<BookRecommendation[]> {
    const response = await this.httpClient.get<BookRecommendation[]>(
      `/ai/recommendations/${userId}`,
    );

    return response.data;
  }

  async hasModel(): Promise<boolean> {
    const response = await this.httpClient.get<boolean>('/ai/has-model');

    return response.data;
  }

  async trainModel(): Promise<void> {
    await this.httpClient.post<null, void>('/ai/train', null);

    return;
  }
}
