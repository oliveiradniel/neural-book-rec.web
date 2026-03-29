export type WithStatus<T> = T & { fetchStatus?: 'pending' | 'error' };
