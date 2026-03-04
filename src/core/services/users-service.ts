import type { IHttpClient } from '../contracts/http-client';
import type { IUsersService } from '../contracts/users-service';

import type { UserWithReadings } from '../domain/types/user-with-readings';

export class UsersService implements IUsersService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async getUsersWithReadings(): Promise<UserWithReadings[]> {
    const response = await this.httpClient.get<UserWithReadings[]>('/users');

    return response.data;
  }
}
