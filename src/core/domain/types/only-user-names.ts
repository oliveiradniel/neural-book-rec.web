import type { User } from '../entities/user';

export type OnlyUserNames = Pick<User, 'id' | 'name'>;
