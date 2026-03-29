import type { IBooksService } from '../contracts/books-service';
import type { IHttpClient } from '../contracts/http-client';

import type { Reading } from '../domain/entities/reading';
import type { UnreadBook } from '../domain/types/unread-book';
import type { UpdateReadingData } from '../domain/types/update-reading-data';

export class BooksService implements IBooksService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getUnreadBooksByUserId(userId: string): Promise<UnreadBook[]> {
    const response = await this.httpClient.get<UnreadBook[]>(
      `books/unread/${userId}`,
    );

    return response.data;
  }

  async updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading> {
    const response = await this.httpClient.patch<UpdateReadingData, Reading>(
      `/books/readings/${readingId}`,
      data,
    );

    return response.data;
  }
}
