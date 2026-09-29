import { createInitialResonance } from "@/game/data/resonance";
import { createInitialHeroProgression } from "@/game/progression/heroProgression";
import { createInitialHeroStates, getMaxEnergy, getMaxHealth } from "@/game/simulation/heroState";
import { createInitialShift } from "@/game/simulation/shift";
import type { SaveGame } from "@/game/types";

export const SAVE_KEY = "ressonancia.save";
export const CURRENT_SAVE_VERSION = 6 as const;

const emptyRelationship = () => ({ trust: 0, respect: 0, intimacy: 0, tension: 0, attraction: 0 });

export function createNewSave(playerName: string): SaveGame {
  return {
    version: CURRENT_SAVE_VERSION,
    player: {
      name: playerName.trim(),
      currentDay: 1,
      reputation: 50,
      currentChapter: "dia-1",
      developmentRequired: false
    },
    heroStates: createInitialHeroStates(),
    heroProgression: createInitialHeroProgression(),
    relationships: {
      yuki: emptyRelationship(), elysia: emptyRelationship(), lysandro: emptyRelationship(), helio: emptyRelationship(),
      demetria: emptyRelationship(), alexandra: emptyRelationship(), eros: emptyRelationship()
    },
    resonance: createInitialResonance(),
    shift: createInitialShift(1),
    flags: [],
    lastDispatch: null
  };
}

function migrateHeroStates(value: unknown, progression: ReturnType<typeof createInitialHeroProgression>): ReturnType<typeof createInitialHeroStates> {
  const initial = createInitialHeroStates();
  if (!value || typeof value !== "object") return initial;
  const oldStates = value as Record<string, Record<string, unknown>>;
  for (const [id, base] of Object.entries(initial)) {
    const old = oldStates[id];
    if (!old) continue;
    const attrs = progression[id]?.attributes;
    if (!attrs) continue;
    const maxHealth = getMaxHealth(attrs);
    const maxEnergy = getMaxEnergy(attrs);
    const rawHealth = typeof old.health === "number" ? old.health : 100;
    const rawEnergy = typeof old.energy === "number" ? old.energy : Math.max(0, 100 - Number(old.fatigue ?? 0));
    // v5 usava escala 0-100; preservamos a proporção ao migrar para a escala curta.
    const health = rawHealth > maxHealth ? Math.round((rawHealth / 100) * maxHealth) : rawHealth;
    const energy = rawEnergy > maxEnergy ? Math.round((rawEnergy / 100) * maxEnergy) : rawEnergy;
    const knockedOut = health <= 0 || energy <= 0;
    initial[id] = { ...base, status: knockedOut ? "desmaiado" : "disponivel", health: Math.max(0, Math.min(maxHealth, health)), energy: Math.max(0, Math.min(maxEnergy, energy)), missionId: null, busyUntilGameMinute: null };
  }
  return initial;
}

function migrateSave(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const old = value as Record<string, unknown>;
  const player = old.player as Record<string, unknown> | undefined;
  const currentDay = typeof player?.currentDay === "number" ? player.currentDay : 1;
  if ([1,2,3,4,5].includes(Number(old.version))) {
    const progression = Number(old.version) >= 4 && old.heroProgression ? old.heroProgression as ReturnType<typeof createInitialHeroProgression> : createInitialHeroProgression();
    return { ...old, version: 6, player: { ...(player ?? {}), currentDay, developmentRequired: Boolean(player?.developmentRequired) }, heroStates: migrateHeroStates(old.heroStates, progression), heroProgression: progression, resonance: old.resonance ?? createInitialResonance(), shift: createInitialShift(currentDay), lastDispatch: null };
  }
  return value;
}

function isRelationship(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return ["trust", "respect", "intimacy", "tension", "attraction"].every((key) => typeof item[key] === "number");
}

function isHeroState(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.heroId === "string" && typeof item.health === "number" && typeof item.energy === "number" && typeof item.status === "string";
}

function isHeroProgression(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const attributes = item.attributes as Record<string, unknown> | undefined;
  return typeof item.heroId === "string" && typeof item.level === "number" && typeof item.xp === "number" &&
    !!attributes && ["strength","agility","charisma","intelligence","vigor"].every((key) => typeof attributes[key] === "number") &&
    typeof item.unspentAttributePoints === "number" && Array.isArray(item.unlockedTechniqueIds) && Array.isArray(item.pendingMilestoneLevels);
}

export function isValidSave(value: unknown): value is SaveGame {
  if (!value || typeof value !== "object") return false;
  const save = value as Record<string, unknown>;
  const player = save.player as Record<string, unknown> | undefined;
  const relationships = save.relationships as Record<string, unknown> | undefined;
  const heroStates = save.heroStates as Record<string, unknown> | undefined;
  const heroProgression = save.heroProgression as Record<string, unknown> | undefined;
  return save.version === CURRENT_SAVE_VERSION && !!player && typeof player.name === "string" && typeof player.currentDay === "number" && typeof player.developmentRequired === "boolean" &&
    !!relationships && Object.values(relationships).every(isRelationship) &&
    !!heroStates && Object.values(heroStates).every(isHeroState) &&
    !!heroProgression && Object.values(heroProgression).every(isHeroProgression) &&
    !!save.resonance && typeof save.resonance === "object" && !!save.shift && typeof save.shift === "object" && Array.isArray(save.flags);
}

export function loadSave(): SaveGame | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const migrated = migrateSave(parsed);
    if (!isValidSave(migrated)) return null;
    const save = { ...migrated, lastDispatch: migrated.lastDispatch ?? null };
    if (parsed.version !== CURRENT_SAVE_VERSION) writeSave(save);
    return save;
  } catch {
    return null;
  }
}

export function writeSave(save: SaveGame): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVE_KEY, JSON.stringify(save));
}

export function updateSave(updater: (save: SaveGame) => SaveGame): SaveGame | null {
  const current = loadSave();
  if (!current) return null;
  const next = updater(current);
  writeSave(next);
  return next;
}
