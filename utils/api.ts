// utils/api/apiClient.ts
// Le chiamate passano dal proxy interno (app/api/tmdb): il token TMDB
// vive solo sul server.
const BASE_URL = "/api/tmdb";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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
    body?: unknown
  ): Promise<T> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });
    const query = searchParams.toString();
    const url = `${this.baseUrl}${endpoint}${query ? `?${query}` : ""}`;

    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Errore API: ${response.status} ${response.statusText}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error("Errore API:", error);
      throw error;
    }
  }

  get<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, "GET", params);
  }

  post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, "POST", {}, body);
  }

  put<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, "PUT", {}, body);
  }

  delete<T>(
    endpoint: string,
    params?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, "DELETE", params);
  }
}

export const API = new ApiClient(BASE_URL);
