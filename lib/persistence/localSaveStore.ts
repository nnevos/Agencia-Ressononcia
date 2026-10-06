import type { LocalSaveMeta, SaveSlotKey } from "@/lib/persistence/contracts";

export const LOCAL_SAVE_KEY = "ressonancia.save";
export const LOCAL_SAVE_META_KEY = "ressonancia.save.meta";
export const LOCAL_SAVE_WRITTEN_EVENT = "ressonancia:save-written";

const DEFAULT_SLOT: SaveSlotKey = "campaign";

export function readLocalSaveRaw(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOCAL_SAVE_KEY);
}

export function readLocalSaveMeta(): LocalSaveMeta | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LOCAL_SAVE_META_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<LocalSaveMeta>;
    if (parsed.slotKey !== DEFAULT_SLOT || typeof parsed.revision !== "number" || typeof parsed.updatedAt !== "string") return null;
    return parsed as LocalSaveMeta;
  } catch {
    return null;
  }
}

export function ensureLocalSaveMeta(): LocalSaveMeta | null {
  if (typeof window === "undefined" || !localStorage.getItem(LOCAL_SAVE_KEY)) return null;
  const existing = readLocalSaveMeta();
  if (existing) return existing;
  const meta: LocalSaveMeta = { slotKey: DEFAULT_SLOT, revision: 1, updatedAt: new Date().toISOString() };
  localStorage.setItem(LOCAL_SAVE_META_KEY, JSON.stringify(meta));
  return meta;
}

export function writeLocalSaveRaw(raw: string, options?: { preserveRevision?: boolean }): LocalSaveMeta | null {
  if (typeof window === "undefined") return null;
  const currentRaw = localStorage.getItem(LOCAL_SAVE_KEY);
  const previous = readLocalSaveMeta();

  // Escritas idempotentes nao criam nova revisao nem acordam o CloudSyncBridge.
  // Isso protege contra loops de render/polling que tentem persistir o mesmo
  // payload repetidamente.
  if (currentRaw === raw) return previous ?? ensureLocalSaveMeta();

  const meta: LocalSaveMeta = {
    slotKey: DEFAULT_SLOT,
    revision: options?.preserveRevision && previous ? previous.revision : (previous?.revision ?? 0) + 1,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(LOCAL_SAVE_KEY, raw);
  localStorage.setItem(LOCAL_SAVE_META_KEY, JSON.stringify(meta));
  window.dispatchEvent(new CustomEvent(LOCAL_SAVE_WRITTEN_EVENT, { detail: meta }));
  return meta;
}

export function clearLocalSave(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_SAVE_KEY);
  localStorage.removeItem(LOCAL_SAVE_META_KEY);
}
