export const ReadingStatus = {
  READ: 'READ',
  WANT_TO_READ: 'WANT_TO_READ',
} as const;

export type ReadingStatus = (typeof ReadingStatus)[keyof typeof ReadingStatus];

export type Reading = {
  id: string;
  userId: string;
  bookId: string;
  rating?: number | null;
  status: ReadingStatus;
};
