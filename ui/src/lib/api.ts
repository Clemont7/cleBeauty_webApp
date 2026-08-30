export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const TOKEN_KEY = "cle.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Options = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

export async function api<T = unknown>(path: string, opts: Options = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: opts.method || "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError(
      "Não foi possível contactar o servidor. Confirma que a API está a correr em " + API_URL,
      0,
    );
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message =
      (data && (Array.isArray(data.message) ? data.message.join(", ") : data.message)) ||
      "Ocorreu um erro.";
    throw new ApiError(message, res.status);
  }
  return data as T;
}
