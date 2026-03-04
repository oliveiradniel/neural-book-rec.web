import { HttpClient } from '../infra/http-client';

import type { IHttpClient } from '../contracts/http-client';

export function makeHttpClient(): IHttpClient {
  return new HttpClient();
}
