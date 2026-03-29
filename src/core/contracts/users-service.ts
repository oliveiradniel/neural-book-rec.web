import type { OnlyUserNames } from '../domain/types/only-user-names';
import type { UserWithReadings } from '../domain/types/user-with-readings';

export abstract class IUsersService {
  abstract listOnlyNames(): Promise<OnlyUserNames[]>;
  abstract getWithReadings(id: string): Promise<UserWithReadings>;
  abstract getUsersWithReadings(): Promise<UserWithReadings[]>;
}
