import { createInitialResonance } from "@/game/data/resonance";
import { createInitialHeroProgression, queueEarnedMilestones } from "@/game/progression/heroProgression";
import { createInitialHeroStates, getMaxEnergy, getMaxHealth } from "@/game/simulation/heroState";
import { createInitialShift } from "@/game/simulation/shift";
import type { SaveGame } from "@/game/types";

export const SAVE_KEY = "ressonancia.save";
export const CURRENT_SAVE_VERSION = 9 as const;

const emptyRelationship = () => ({ trust: 0, respect: 0, intimacy: 0, tension: 0, attraction: 0 });

const HERO_IDS = ["yuki", "elysia", "lysandro", "helio", "demetria", "alexandra", "eros"] as const;

function createInitialSocialState() {
  return {
    romanceProgress: Object.fromEntries(HERO_IDS.map((id) => [id, 0])) as Record<string, number>,
    routeStage: Object.fromEntries(HERO_IDS.map((id) => [id, 1])) as Record<string, number>,
    romanceEarnedByStage: {} as Record<string, Record<string, number>>,
    outingsByGlobalDay: {} as Record<string, string>,
    outingMilestones: Object.fromEntries(HERO_IDS.map((id) => [id, []])) as Record<string, number[]>,
  };
}

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
    social: createInitialSocialState(),
    shift: createInitialShift(1, playerName.trim()),
    flags: ["onboarding_pending"],
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

function ensureMastery(progression: Record<string, any>) {
  return Object.fromEntries(Object.entries(progression).map(([id, p]) => [id, { ...p, masteryRank: typeof p?.masteryRank === "number" ? p.masteryRank : 0 }]));
}

function migrateSave(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  const old = value as Record<string, unknown>;
  const player = old.player as Record<string, unknown> | undefined;
  const currentDay = typeof player?.currentDay === "number" ? player.currentDay : 1;
  const numericVersion = Number(old.version);

  if ([1,2,3,4,5].includes(numericVersion)) {
    const progression = numericVersion >= 4 && old.heroProgression
      ? old.heroProgression as ReturnType<typeof createInitialHeroProgression>
      : createInitialHeroProgression();
    return {
      ...old,
      version: 9,
      player: { ...(player ?? {}), currentDay, developmentRequired: Boolean(player?.developmentRequired) },
      heroStates: migrateHeroStates(old.heroStates, progression),
      heroProgression: ensureMastery(progression),
      resonance: old.resonance ?? createInitialResonance(),
      social: createInitialSocialState(),
      shift: createInitialShift(currentDay, String(player?.name ?? "default")),
      lastDispatch: null,
    };
  }

  if (numericVersion === 6) {
    return { ...old, version: 9, heroProgression: ensureMastery((old.heroProgression ?? createInitialHeroProgression()) as Record<string, any>), social: createInitialSocialState() };
  }

  if (numericVersion === 7) {
    const oldSocial = old.social as Record<string, unknown> | undefined;
    return {
      ...old,
      version: 9,
      heroProgression: ensureMastery((old.heroProgression ?? createInitialHeroProgression()) as Record<string, any>),
      social: {
        ...createInitialSocialState(),
        ...(oldSocial ?? {}),
      },
    };
  }

  if (numericVersion === 8) {
    const oldSocial = old.social as Record<string, unknown> | undefined;
    const oldProgress = (oldSocial?.romanceProgress ?? {}) as Record<string, number>;
    const fresh = createInitialSocialState();
    return { ...old, version: 9, heroProgression: Object.fromEntries(Object.entries((old.heroProgression ?? {}) as Record<string, any>).map(([id,p])=>[id,{...p,masteryRank:0}])), social: { ...fresh, romanceProgress: { ...fresh.romanceProgress, ...oldProgress } } };
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
  return typeof item.heroId === "string" && typeof item.level === "number" && typeof item.xp === "number" && typeof item.masteryRank === "number" &&
    !!attributes && ["strength","agility","charisma","intelligence","vigor"].every((key) => typeof attributes[key] === "number") &&
    typeof item.unspentAttributePoints === "number" && Array.isArray(item.unlockedTechniqueIds) && Array.isArray(item.pendingMilestoneLevels);
}

function isSocialState(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  const progress = item.romanceProgress as Record<string, unknown> | undefined;
  const stages = item.routeStage as Record<string, unknown> | undefined;
  const earned = item.romanceEarnedByStage as Record<string, unknown> | undefined;
  const outings = item.outingsByGlobalDay as Record<string, unknown> | undefined;
  const milestones = item.outingMilestones as Record<string, unknown> | undefined;
  return !!progress && !!stages && HERO_IDS.every((id) => typeof progress[id] === "number" && typeof stages[id] === "number") && !!earned && typeof earned === "object" && !!outings && typeof outings === "object" && !!milestones && typeof milestones === "object";
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
    !!save.resonance && typeof save.resonance === "object" && isSocialState(save.social) && !!save.shift && typeof save.shift === "object" && Array.isArray(save.flags);
}

export function loadSave(): SaveGame | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const migrated = migrateSave(parsed);
    if (!isValidSave(migrated)) return null;
    const normalizedProgression = Object.fromEntries(Object.entries(migrated.heroProgression).map(([id, progress]) => [id, queueEarnedMilestones(progress)]));
    const save = { ...migrated, heroProgression: normalizedProgression, lastDispatch: migrated.lastDispatch ?? null };
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
