import { getSupabasePublicConfig } from "@/lib/supabase/config";

export class SupabaseRequestError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "SupabaseRequestError";
    this.status = status;
    this.details = details;
  }
}

export async function supabaseFetch<T>(path: string, init: RequestInit = {}, accessToken?: string): Promise<T> {
  const config = getSupabasePublicConfig();
  if (!config) throw new SupabaseRequestError("Supabase não configurado nesta build.", 0);
  const headers = new Headers(init.headers);
  headers.set("apikey", config.anonKey);
  headers.set("Accept", "application/json");
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const response = await fetch(`${config.url}${path}`, { ...init, headers });
  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try { data = JSON.parse(text); } catch { data = text; }
  }
  if (!response.ok) {
    const objectData = typeof data === "object" && data ? data as Record<string, unknown> : null;
    const detail = objectData?.message ?? objectData?.msg ?? objectData?.error_description ?? objectData?.error;
    const message = detail ? String(detail) : `Falha Supabase (${response.status}).`;
    throw new SupabaseRequestError(message, response.status, data);
  }
  return data as T;
}
