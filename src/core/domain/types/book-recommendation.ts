import type { Genre } from '../entities/literary-genre';

export type BookRecommendation = {
  id: string;
  title: string;
  author: string;
  literaryGenres: Genre[];
  countActiveReadings: number;
  score: number;
};
