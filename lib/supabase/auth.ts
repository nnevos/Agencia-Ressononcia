import { supabaseFetch } from "@/lib/supabase/http";

export type SupabaseUser = {
  id: string;
  email?: string;
  user_metadata?: { display_name?: string; [key: string]: unknown };
};

export type SupabaseAuthTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at?: number;
  user: SupabaseUser;
};

export type SupabaseSignupResult = {
  session: SupabaseAuthTokens | null;
  user: SupabaseUser | null;
};

export async function signInWithPassword(email: string, password: string): Promise<SupabaseAuthTokens> {
  return supabaseFetch<SupabaseAuthTokens>("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signUpWithPassword(email: string, password: string, displayName?: string): Promise<SupabaseSignupResult> {
  const result = await supabaseFetch<{ access_token?: string; refresh_token?: string; expires_in?: number; expires_at?: number; user?: SupabaseUser }>("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, data: displayName ? { display_name: displayName } : undefined }),
  });
  const session = result.access_token && result.refresh_token && result.user
    ? ({ access_token: result.access_token, refresh_token: result.refresh_token, expires_in: result.expires_in ?? 3600, expires_at: result.expires_at, user: result.user } satisfies SupabaseAuthTokens)
    : null;
  return { session, user: result.user ?? null };
}

export async function refreshAuthSession(refreshToken: string): Promise<SupabaseAuthTokens> {
  return supabaseFetch<SupabaseAuthTokens>("/auth/v1/token?grant_type=refresh_token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

export async function signOutRemote(accessToken: string): Promise<void> {
  await supabaseFetch<unknown>("/auth/v1/logout", { method: "POST" }, accessToken);
}
