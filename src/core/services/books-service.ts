import type { IBooksService } from '../contracts/books-service';
import type { IHttpClient } from '../contracts/http-client';

import type { Reading } from '../domain/entities/reading';
import type { CreateReadingData } from '../domain/types/create-reading-data';
import type { UnreadBook } from '../domain/types/unread-book';
import type { UpdateReadingData } from '../domain/types/update-reading-data';
import type { ReadingBook } from '../domain/types/user-with-readings';

export class BooksService implements IBooksService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getUnreadBooksByUserId(userId: string): Promise<UnreadBook[]> {
    const response = await this.httpClient.get<UnreadBook[]>(
      `/books/unread/${userId}`,
    );

    return response.data;
  }

  async createReading(
    bookId: string,
    data: CreateReadingData,
  ): Promise<ReadingBook> {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await this.httpClient.post<CreateReadingData, ReadingBook>(
      `/bookss/${bookId}/readings`,
      {
        userId: data.userId,
        status: data.status,
        rating: data.rating,
      },
    );

    return response.data;
  }

  async updateReading(
    readingId: string,
    data: UpdateReadingData,
  ): Promise<Reading> {
    const response = await this.httpClient.patch<UpdateReadingData, Reading>(
      `/bookss/readings/${readingId}`,
      data,
    );

    return response.data;
  }
}
