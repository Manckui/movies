// utils/api/apiClient.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Classe generica per effettuare richieste API
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    method: HttpMethod,
    params: Record<string, string | number> = {},
    body?: unknown // 🟢 Sostituiamo `any` con `unknown`
  ): Promise<T> {
    if (!API_KEY || !ACCESS_TOKEN || !BASE_URL) {
      throw new Error('Le variabili di ambiente non sono impostate correttamente.');
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.search = new URLSearchParams(
      { api_key: API_KEY, ...params } as Record<string, string>
    ).toString();

    const options: RequestInit = {
      method,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url.toString(), options);
      if (!response.ok) {
        throw new Error(`Errore API: ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error('Errore API:', error);
      throw error;
    }
  }

  get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.request<T>(endpoint, 'GET', params);
  }

  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, 'POST', {}, body);
  }

  put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, 'PUT', {}, body);
  }

  delete<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', params);
  }
}

export const API = new ApiClient(BASE_URL!);
