import type { CloudSaveRecord, RemoteSaveStore, SaveSlotKey } from "@/lib/persistence/contracts";
import { supabaseFetch } from "@/lib/supabase/http";
import type { SaveGame } from "@/game/types";

type SupabaseSaveRow = {
  user_id: string;
  slot_key: SaveSlotKey;
  schema_version: number;
  client_revision: number;
  payload: SaveGame;
  updated_at: string;
};

function toRecord(row: SupabaseSaveRow): CloudSaveRecord {
  return {
    userId: row.user_id,
    slotKey: row.slot_key,
    schemaVersion: row.schema_version,
    clientRevision: row.client_revision,
    payload: row.payload,
    updatedAt: row.updated_at,
  };
}

export function createSupabaseSaveStore(accessToken: string, userId: string): RemoteSaveStore {
  return {
    async load(slotKey) {
      const rows = await supabaseFetch<SupabaseSaveRow[]>(`/rest/v1/game_saves?slot_key=eq.${encodeURIComponent(slotKey)}&select=user_id,slot_key,schema_version,client_revision,payload,updated_at&limit=1`, {
        method: "GET",
      }, accessToken);
      return rows[0] ? toRecord(rows[0]) : null;
    },
    async upsert(record) {
      const rows = await supabaseFetch<SupabaseSaveRow[]>("/rest/v1/game_saves?on_conflict=user_id,slot_key", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=representation" },
        body: JSON.stringify({
          user_id: userId,
          slot_key: record.slotKey,
          schema_version: record.schemaVersion,
          client_revision: record.clientRevision,
          payload: record.payload,
        }),
      }, accessToken);
      if (!rows[0]) throw new Error("Supabase não retornou o save sincronizado.");
      return toRecord(rows[0]);
    },
    async remove(slotKey) {
      await supabaseFetch<unknown>(`/rest/v1/game_saves?slot_key=eq.${encodeURIComponent(slotKey)}`, {
        method: "DELETE",
      }, accessToken);
    },
  };
}
