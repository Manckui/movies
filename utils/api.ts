// utils/api/apiClient.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

/**
 * Classe generica per effettuare richieste API
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {
    if (!API_KEY || !ACCESS_TOKEN || !BASE_URL) {
      throw new Error(
        "Le variabili di ambiente non sono impostate correttamente."
      );
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    const mergedSearchParams = new URLSearchParams(url.search);
    mergedSearchParams.set("api_key", API_KEY);

    Object.entries(params).forEach(([key, value]) => {
      mergedSearchParams.set(key, String(value));
    });

    url.search = mergedSearchParams.toString();

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Errore API: ${response.statusText}`);
    }
    return (await response.json()) as T;
  }
}

export const API = new ApiClient(BASE_URL!);
