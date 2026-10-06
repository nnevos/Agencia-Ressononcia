import { isSupabaseConfigured } from "@/lib/supabase/config";
import { refreshAuthSession, signInWithPassword, signOutRemote, signUpWithPassword, type SupabaseAuthTokens } from "@/lib/supabase/auth";

export type GuestAccountSession = { mode: "guest" };
export type SupabaseAccountSession = {
  mode: "supabase";
  userId: string;
  email?: string;
  displayName?: string;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
export type AccountSession = GuestAccountSession | SupabaseAccountSession;

const ACCOUNT_SESSION_KEY = "ressonancia.account.session";
export const ACCOUNT_SESSION_EVENT = "ressonancia:account-session";

function emitAccountChange(session: AccountSession | null) {
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent(ACCOUNT_SESSION_EVENT, { detail: session }));
}

function persistSession(session: AccountSession | null) {
  if (typeof window === "undefined") return;
  if (!session) localStorage.removeItem(ACCOUNT_SESSION_KEY);
  else localStorage.setItem(ACCOUNT_SESSION_KEY, JSON.stringify(session));
  emitAccountChange(session);
}

function fromTokens(tokens: SupabaseAuthTokens): SupabaseAccountSession {
  const expiresAt = tokens.expires_at ?? Math.floor(Date.now() / 1000) + tokens.expires_in;
  return {
    mode: "supabase",
    userId: tokens.user.id,
    email: tokens.user.email,
    displayName: tokens.user.user_metadata?.display_name,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt,
  };
}

export function loadAccountSession(): AccountSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ACCOUNT_SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed.mode === "guest") return { mode: "guest" };
    if (parsed.mode === "supabase" && typeof parsed.userId === "string" && typeof parsed.accessToken === "string" && typeof parsed.refreshToken === "string" && typeof parsed.expiresAt === "number") {
      return parsed as unknown as SupabaseAccountSession;
    }
    // Migração conservadora da antiga sessão preview: não reaproveita e-mail como autenticação.
    if (parsed.mode === "preview") {
      localStorage.removeItem(ACCOUNT_SESSION_KEY);
      return null;
    }
    return null;
  } catch {
    return null;
  }
}

export function startGuestSession(): AccountSession {
  const session: GuestAccountSession = { mode: "guest" };
  persistSession(session);
  return session;
}

export async function signInAccount(email: string, password: string): Promise<SupabaseAccountSession> {
  if (!isSupabaseConfigured()) throw new Error("Supabase ainda não foi configurado nesta instalação.");
  const session = fromTokens(await signInWithPassword(email, password));
  persistSession(session);
  return session;
}

export async function createAccount(email: string, password: string, displayName?: string): Promise<{ session: SupabaseAccountSession | null; emailConfirmationRequired: boolean }> {
  if (!isSupabaseConfigured()) throw new Error("Supabase ainda não foi configurado nesta instalação.");
  const result = await signUpWithPassword(email, password, displayName);
  const session = result.session ? fromTokens(result.session) : null;
  if (session) persistSession(session);
  return { session, emailConfirmationRequired: result.emailConfirmationRequired };
}

export async function getUsableAccountSession(): Promise<AccountSession | null> {
  const current = loadAccountSession();
  if (!current || current.mode === "guest") return current;
  const now = Math.floor(Date.now() / 1000);
  if (current.expiresAt - now > 90) return current;
  try {
    const refreshed = fromTokens(await refreshAuthSession(current.refreshToken));
    persistSession(refreshed);
    return refreshed;
  } catch {
    persistSession(null);
    return null;
  }
}

export async function clearAccountSession(): Promise<void> {
  const current = loadAccountSession();
  if (current?.mode === "supabase") {
    try { await signOutRemote(current.accessToken); } catch { /* logout local continua válido */ }
  }
  persistSession(null);
}

export function accountBackendAvailable(): boolean {
  return isSupabaseConfigured();
}
