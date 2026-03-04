import { HttpClient } from '../infra/http-client';

import type { IHttpClient } from '../contracts/http-client';

export function makeHttpClient(basePath?: string): IHttpClient {
  return new HttpClient(basePath);
}
