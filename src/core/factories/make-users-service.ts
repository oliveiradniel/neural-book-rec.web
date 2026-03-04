import { UsersService } from '../services/users-service';

import { makeHttpClient } from './make-http-client';

import type { IUsersService } from '../contracts/users-service';

export function makeUsersService(): IUsersService {
  const httpClient = makeHttpClient();

  return new UsersService(httpClient);
}
