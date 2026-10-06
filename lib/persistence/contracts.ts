import type { SaveGame } from "@/game/types";

export type SaveSlotKey = "campaign";

export type LocalSaveMeta = {
  slotKey: SaveSlotKey;
  revision: number;
  updatedAt: string;
};

export type CloudSaveRecord = {
  userId: string;
  slotKey: SaveSlotKey;
  schemaVersion: number;
  clientRevision: number;
  updatedAt: string;
  payload: SaveGame;
};

export type CloudSyncState =
  | { status: "disabled"; reason: "not-configured" | "guest" | "not-bound" }
  | { status: "ready"; userId: string; lastSyncedAt?: string }
  | { status: "conflict"; userId: string; remoteUpdatedAt: string; localUpdatedAt: string }
  | { status: "error"; userId?: string; message: string };

export interface RemoteSaveStore {
  load(slotKey: SaveSlotKey): Promise<CloudSaveRecord | null>;
  upsert(record: Omit<CloudSaveRecord, "updatedAt">): Promise<CloudSaveRecord>;
  remove(slotKey: SaveSlotKey): Promise<void>;
}
