export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export abstract class IHttpClient {
  abstract get<TResponse>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;
  abstract post<TBody, TResponse>(
    path: string,
    body: TBody,
    config?: HttpRequestConfig,
  ): Promise<TResponse>;
}
