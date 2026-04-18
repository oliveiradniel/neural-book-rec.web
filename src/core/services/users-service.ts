import type { IHttpClient } from '../contracts/http-client';
import type { IUsersService } from '../contracts/users-service';

import type { OnlyUserNames } from '../domain/types/only-user-names';
import type { UserWithReadings } from '../domain/types/user-with-readings';

export class UsersService implements IUsersService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async listOnlyNames(): Promise<OnlyUserNames[]> {
    const response =
      await this.httpClient.get<OnlyUserNames[]>('/users/only-names');

    return response.data;
  }

  async getWithReadings(id: string): Promise<UserWithReadings> {
    const response = await this.httpClient.get<UserWithReadings>(
      `/users/${id}`,
    );
    return response.data;
  }

  async getUsersWithReadings(): Promise<UserWithReadings[]> {
    const response = await this.httpClient.get<UserWithReadings[]>('/users');

    return response.data;
  }
}
