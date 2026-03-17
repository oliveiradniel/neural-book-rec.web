import type { Genre } from '../entities/literary-genre';
import type { ReadingStatus } from '../entities/reading';

type ReadingBook = {
  book: {
    id: string;
    title: string;
    author: {
      id: string;
      name: string;
    };
    literaryGenres: {
      id: string;
      name: Genre;
    }[];
  };
  rating?: number | null;
  status: ReadingStatus;
};

export type UserWithReadings = {
  id: string;
  name: string;
  age: number;
  bookCount: {
    read: number;
    wantToRead: number;
  };
  readings: ReadingBook[];
};
