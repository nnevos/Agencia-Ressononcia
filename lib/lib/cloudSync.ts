import type { SaveGame } from "@/game/types";
import { importSaveJson, loadSave, writeSave } from "@/lib/save";
import { ensureLocalSaveMeta, readLocalSaveMeta } from "@/lib/persistence/localSaveStore";
import { createSupabaseSaveStore } from "@/lib/supabase/saveStore";
import { getUsableAccountSession, type SupabaseAccountSession } from "@/lib/account";

const CLOUD_BINDING_KEY = "ressonancia.cloud.binding";
const CLOUD_SYNC_EVENT = "ressonancia:cloud-sync";

type CloudBinding = { userId: string; enabled: boolean; lastSyncedAt?: string };

export type CloudReconcileResult =
  | { status: "not-authenticated" }
  | { status: "empty" }
  | { status: "uploaded-local" }
  | { status: "downloaded-cloud" }
  | { status: "in-sync" }
  | { status: "conflict"; localUpdatedAt: string; remoteUpdatedAt: string; remoteDay: number; remotePlayerName: string };

function readBinding(): CloudBinding | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CLOUD_BINDING_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CloudBinding;
    return typeof parsed.userId === "string" && typeof parsed.enabled === "boolean" ? parsed : null;
  } catch { return null; }
}

function writeBinding(binding: CloudBinding | null) {
  if (typeof window === "undefined") return;
  if (!binding) localStorage.removeItem(CLOUD_BINDING_KEY);
  else localStorage.setItem(CLOUD_BINDING_KEY, JSON.stringify(binding));
  window.dispatchEvent(new CustomEvent(CLOUD_SYNC_EVENT));
}

export function isCloudSyncBound(userId: string): boolean {
  const binding = readBinding();
  return Boolean(binding?.enabled && binding.userId === userId);
}

export function disableCloudSync(): void { writeBinding(null); }

async function getRemoteContext(): Promise<{ session: SupabaseAccountSession; store: ReturnType<typeof createSupabaseSaveStore> } | null> {
  const account = await getUsableAccountSession();
  if (!account || account.mode !== "supabase") return null;
  return { session: account, store: createSupabaseSaveStore(account.accessToken, account.userId) };
}

export async function pushLocalSaveToCloud(): Promise<boolean> {
  const ctx = await getRemoteContext();
  if (!ctx || !isCloudSyncBound(ctx.session.userId)) return false;
  const save = loadSave();
  if (!save) return false;
  const meta = ensureLocalSaveMeta();
  if (!meta) return false;
  const remote = await ctx.store.upsert({
    userId: ctx.session.userId,
    slotKey: meta.slotKey,
    schemaVersion: save.version,
    clientRevision: meta.revision,
    payload: save,
  });
  writeBinding({ userId: ctx.session.userId, enabled: true, lastSyncedAt: remote.updatedAt });
  return true;
}

export async function reconcileCloudSave(): Promise<CloudReconcileResult> {
  const ctx = await getRemoteContext();
  if (!ctx) return { status: "not-authenticated" };
  const local = loadSave();
  const meta = local ? (ensureLocalSaveMeta() ?? readLocalSaveMeta()) : null;
  const remote = await ctx.store.load("campaign");

  if (!local && !remote) {
    writeBinding({ userId: ctx.session.userId, enabled: true });
    return { status: "empty" };
  }
  if (local && !remote && meta) {
    writeBinding({ userId: ctx.session.userId, enabled: true });
    await pushLocalSaveToCloud();
    return { status: "uploaded-local" };
  }
  if (!local && remote) {
    const normalized = importSaveJson(JSON.stringify(remote.payload));
    if (!normalized) throw new Error("Save remoto incompatível com esta versão.");
    writeSave(normalized);
    writeBinding({ userId: ctx.session.userId, enabled: true, lastSyncedAt: remote.updatedAt });
    return { status: "downloaded-cloud" };
  }
  if (!local || !remote || !meta) return { status: "empty" };

  const samePayload = JSON.stringify(local) === JSON.stringify(remote.payload);
  if (samePayload) {
    writeBinding({ userId: ctx.session.userId, enabled: true, lastSyncedAt: remote.updatedAt });
    return { status: "in-sync" };
  }

  writeBinding({ userId: ctx.session.userId, enabled: false, lastSyncedAt: remote.updatedAt });
  return {
    status: "conflict",
    localUpdatedAt: meta.updatedAt,
    remoteUpdatedAt: remote.updatedAt,
    remoteDay: remote.payload.player.currentDay,
    remotePlayerName: remote.payload.player.name,
  };
}

export async function resolveCloudConflict(choice: "local" | "cloud"): Promise<SaveGame | null> {
  const ctx = await getRemoteContext();
  if (!ctx) return null;
  if (choice === "local") {
    writeBinding({ userId: ctx.session.userId, enabled: true });
    await pushLocalSaveToCloud();
    return loadSave();
  }
  const remote = await ctx.store.load("campaign");
  if (!remote) return null;
  const normalized = importSaveJson(JSON.stringify(remote.payload));
  if (!normalized) throw new Error("Save remoto incompatível com esta versão.");
  writeSave(normalized);
  writeBinding({ userId: ctx.session.userId, enabled: true, lastSyncedAt: remote.updatedAt });
  return normalized;
}

export const CLOUD_SYNC_STATUS_EVENT = CLOUD_SYNC_EVENT;
