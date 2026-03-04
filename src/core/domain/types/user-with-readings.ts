import type { Genre } from '../entities/literary-genre';
import type { ReadingStatus } from '../entities/reading';

type Reading = {
  title: string;
  author: string;
  literaryGenres: Genre[];
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
  readings: Reading[];
};
