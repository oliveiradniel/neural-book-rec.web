import axios, { type AxiosResponse } from 'axios';

import { env } from '../../config/env';

import type { HttpRequestConfig, IHttpClient } from '../contracts/http-client';

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

export class HttpClient implements IHttpClient {
  get<TResponse>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return httpClient.get<TResponse>(path, config);
  }

  post<TBody, TResponse>(
    path: string,
    body: TBody,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return httpClient.post<TResponse>(path, body, config);
  }

  patch<TBody, TResponse>(
    path: string,
    body: TBody,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<TResponse>> {
    return httpClient.patch<TResponse>(path, body, config);
  }
}
