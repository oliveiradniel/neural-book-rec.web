import type { Genre } from '@/core/domain/entities/literary-genre';
import type { ReadingStatus } from '@/core/domain/entities/reading';

export const readingStatusLabels: Record<ReadingStatus, string> = {
  READ: 'Concluído',
  WANT_TO_READ: 'Quero ler',
};

export const genreLabels: Record<Genre, string> = {
  FANTASY: 'Fantasia',
  SCIENCE_FICTION: 'Ficção Científica',
  ROMANCE: 'Romance',
  HORROR: 'Terror',
  THRILLER: 'Suspense',
  MYSTERY: 'Mistério',
  ADVENTURE: 'Aventura',
  DRAMA: 'Drama',
  HISTORICAL_FICTION: 'Ficção Histórica',
  DYSTOPIA: 'Distopia',
  BIOGRAPHY: 'Biografia',
  PHILOSOPHY: 'Filosofia',
  SELF_HELP: 'Autoajuda',
  BUSINESS: 'Negócios',
  SCIENCE: 'Ciência',
  TECHNOLOGY: 'Tecnologia',
  POETRY: 'Poesia',
  CHILDREN: 'Infantil',
};
