import axios from 'axios';

import { env } from '../../config/env';

import type { HttpRequestConfig, IHttpClient } from '../contracts/http-client';

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

export class HttpClient implements IHttpClient {
  private readonly basePath: string;

  constructor(basePath?: string) {
    this.basePath = basePath ?? '';
  }

  async get<TResponse>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<TResponse> {
    const response = await httpClient.get<TResponse>(
      `${this.basePath}/${path}`,
      config,
    );
    return response.data;
  }

  async post<TBody, TResponse>(
    path: string,
    body: TBody,
    config?: HttpRequestConfig,
  ): Promise<TResponse> {
    const response = await httpClient.post<TResponse>(
      `${this.basePath}/${path}`,
      body,
      config,
    );
    return response.data;
  }
}
