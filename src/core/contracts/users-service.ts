import type { UserWithReadings } from '../domain/types/user-with-readings';

export abstract class IUsersService {
  abstract getUsersWithReadings(userId: string): Promise<UserWithReadings[]>;
}
