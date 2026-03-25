import { BooksService } from '../services/books-service';

import { makeHttpClient } from './make-http-client';

import type { IBooksService } from '../contracts/books-service';

export function makeBooksService(): IBooksService {
  return new BooksService(makeHttpClient());
}
