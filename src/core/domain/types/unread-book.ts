import type { Genre } from '../entities/literary-genre';

export type UnreadBook = {
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
  countActiveReadings: number;
};
