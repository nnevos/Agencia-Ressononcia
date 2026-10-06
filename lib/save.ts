import { createInitialResonance } from "@/game/data/resonance";
import { createInitialHeroProgression, queueEarnedMilestones } from "@/game/progression/heroProgression";
import { createInitialHeroStates, getMaxEnergy, getMaxHealth } from "@/game/simulation/heroState";
import { createInitialShift, SHIFT_GAME_MINUTES } from "@/game/simulation/shift";
import type { PlayerPronouns, SaveGame } from "@/game/types";
import { repairSocialSave } from "@/game/social/integrity";
import { isPlayerPronouns } from "@/lib/playerText";

import { LOCAL_SAVE_KEY, ensureLocalSaveMeta, readLocalSaveRaw, writeLocalSaveRaw } from "@/lib/persistence/localSaveStore";

export const SAVE_KEY = LOCAL_SAVE_KEY;
export const CURRENT_SAVE_VERSION = 10 as const;
export const POST_SHIFT_ONLY_FLAG = "mode:post-shift-only" as const;
export type NewGameMode = "campaign" | "post-shift-only";

export function isPostShiftOnlySave(save: Pick<SaveGame, "flags">) {
  return save.flags.includes(POST_SHIFT_ONLY_FLAG);
}

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

export function createNewSave(playerName: string, pronouns: PlayerPronouns = "ele-dele", mode: NewGameMode = "campaign"): SaveGame {
  const cleanName = playerName.trim();
  const postShiftOnly = mode === "post-shift-only";
  const initialShift = createInitialShift(1, cleanName);
  return {
    version: CURRENT_SAVE_VERSION,
    player: {
      name: cleanName,
      pronouns,
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
    shift: postShiftOnly ? { ...initialShift, elapsedGameMinutes: SHIFT_GAME_MINUTES, status: "finished" } : initialShift,
    flags: postShiftOnly ? [POST_SHIFT_ONLY_FLAG, "intro_complete", "tutorial_skipped"] : ["onboarding_pending"],
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

function withPronouns(player: Record<string, unknown> | undefined) {
  return { ...(player ?? {}), pronouns: isPlayerPronouns(player?.pronouns) ? player.pronouns : "ele-dele" as PlayerPronouns };
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
      version: 10,
      player: { ...withPronouns(player), currentDay, developmentRequired: Boolean(player?.developmentRequired) },
      heroStates: migrateHeroStates(old.heroStates, progression),
      heroProgression: ensureMastery(progression),
      resonance: old.resonance ?? createInitialResonance(),
      social: createInitialSocialState(),
      shift: createInitialShift(currentDay, String(player?.name ?? "default")),
      lastDispatch: null,
    };
  }

  if (numericVersion === 6) {
    return { ...old, version: 10, player: withPronouns(player), heroProgression: ensureMastery((old.heroProgression ?? createInitialHeroProgression()) as Record<string, any>), social: createInitialSocialState() };
  }

  if (numericVersion === 7) {
    const oldSocial = old.social as Record<string, unknown> | undefined;
    return {
      ...old,
      version: 10,
      player: withPronouns(player),
      heroProgression: ensureMastery((old.heroProgression ?? createInitialHeroProgression()) as Record<string, any>),
      social: { ...createInitialSocialState(), ...(oldSocial ?? {}) },
    };
  }

  if (numericVersion === 8) {
    const oldSocial = old.social as Record<string, unknown> | undefined;
    const oldProgress = (oldSocial?.romanceProgress ?? {}) as Record<string, number>;
    const fresh = createInitialSocialState();
    return { ...old, version: 10, player: withPronouns(player), heroProgression: Object.fromEntries(Object.entries((old.heroProgression ?? {}) as Record<string, any>).map(([id,p])=>[id,{...p,masteryRank:0}])), social: { ...fresh, romanceProgress: { ...fresh.romanceProgress, ...oldProgress } } };
  }

  if (numericVersion === 9 || numericVersion === 10) {
    const freshSocial = createInitialSocialState();
    const oldSocial = (old.social ?? {}) as Record<string, unknown>;
    const oldRelationships = (old.relationships ?? {}) as Record<string, unknown>;
    const relationships = Object.fromEntries(HERO_IDS.map((id) => [id, oldRelationships[id] ?? emptyRelationship()]));
    return {
      ...old,
      version: 10,
      player: withPronouns(player),
      relationships,
      flags: Array.isArray(old.flags) ? Array.from(new Set(old.flags.filter((flag): flag is string => typeof flag === "string"))) : [],
      social: {
        ...freshSocial,
        ...oldSocial,
        romanceProgress: { ...freshSocial.romanceProgress, ...((oldSocial.romanceProgress ?? {}) as Record<string, number>) },
        routeStage: { ...freshSocial.routeStage, ...((oldSocial.routeStage ?? {}) as Record<string, number>) },
        romanceEarnedByStage: { ...freshSocial.romanceEarnedByStage, ...((oldSocial.romanceEarnedByStage ?? {}) as Record<string, Record<string, number>>) },
        outingsByGlobalDay: { ...freshSocial.outingsByGlobalDay, ...((oldSocial.outingsByGlobalDay ?? {}) as Record<string, string>) },
        outingMilestones: { ...freshSocial.outingMilestones, ...((oldSocial.outingMilestones ?? {}) as Record<string, number[]>) },
      },
    };
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
  return save.version === CURRENT_SAVE_VERSION && !!player && typeof player.name === "string" && isPlayerPronouns(player.pronouns) && typeof player.currentDay === "number" && typeof player.developmentRequired === "boolean" &&
    !!relationships && Object.values(relationships).every(isRelationship) &&
    !!heroStates && Object.values(heroStates).every(isHeroState) &&
    !!heroProgression && Object.values(heroProgression).every(isHeroProgression) &&
    !!save.resonance && typeof save.resonance === "object" && isSocialState(save.social) && !!save.shift && typeof save.shift === "object" && Array.isArray(save.flags);
}

/**
 * v0.2.10 hotfix: v0.2.9 podia abrir o primeiro outing do Yuki ao terminar
 * a etapa 2, antes de qualquer escolha da etapa 3. Repara apenas esse estado
 * impossivel: outing 3 concluido sem nenhuma flag de resposta yuki:r3:*.
 */
function repairPrematureYukiOuting(save: SaveGame): { save: SaveGame; changed: boolean } {
  const hasStage3Choice = save.flags.some((flag) => flag.startsWith("yuki:r3:"));
  const milestones = save.social.outingMilestones.yuki ?? [];
  const hasPrematureOuting = !hasStage3Choice && (
    milestones.includes(3) ||
    save.flags.includes("scene:outing-day3-yuki:complete") ||
    save.flags.includes("outing:day3:yuki")
  );
  if (!hasPrematureOuting) return { save, changed: false };

  const outingsByGlobalDay = Object.fromEntries(
    Object.entries(save.social.outingsByGlobalDay).filter(([, characterId]) => characterId !== "yuki")
  );
  const flags = save.flags.filter((flag) =>
    flag !== "scene:outing-day3-yuki:complete" && flag !== "outing:day3:yuki"
  );
  flags.push("hotfix:v0.2.10:yuki-premature-outing-repaired");

  return {
    changed: true,
    save: {
      ...save,
      social: {
        ...save.social,
        routeStage: { ...save.social.routeStage, yuki: 3 },
        outingsByGlobalDay,
        outingMilestones: { ...save.social.outingMilestones, yuki: milestones.filter((stage) => stage !== 3) },
      },
      flags: Array.from(new Set(flags)),
    },
  };
}

function normalizeSavePayload(value: unknown): { save: SaveGame; changed: boolean } | null {
  const originalVersion = value && typeof value === "object" ? Number((value as Record<string, unknown>).version) : NaN;
  const migrated = migrateSave(value);
  if (!isValidSave(migrated)) return null;
  const normalizedProgression = Object.fromEntries(Object.entries(migrated.heroProgression).map(([id, progress]) => [id, queueEarnedMilestones(progress)]));
  const normalized = { ...migrated, heroProgression: normalizedProgression, lastDispatch: migrated.lastDispatch ?? null };
  const legacyRepair = repairPrematureYukiOuting(normalized);
  const socialRepair = repairSocialSave(legacyRepair.save);
  return { save: socialRepair.save, changed: originalVersion !== CURRENT_SAVE_VERSION || legacyRepair.changed || socialRepair.changed };
}

export function importSaveJson(raw: string): SaveGame | null {
  try {
    const normalized = normalizeSavePayload(JSON.parse(raw));
    return normalized?.save ?? null;
  } catch {
    return null;
  }
}

export function exportSaveJson(save: SaveGame): string {
  return JSON.stringify(save, null, 2);
}

export function loadSave(): SaveGame | null {
  if (typeof window === "undefined") return null;
  const raw = readLocalSaveRaw();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const normalized = normalizeSavePayload(parsed);
    if (!normalized) return null;
    if (normalized.changed) writeSave(normalized.save);
    else ensureLocalSaveMeta();
    return normalized.save;
  } catch {
    return null;
  }
}

export function writeSave(save: SaveGame): void {
  if (typeof window === "undefined") return;
  writeLocalSaveRaw(JSON.stringify(save));
}

export function updateSave(updater: (save: SaveGame) => SaveGame): SaveGame | null {
  const current = loadSave();
  if (!current) return null;
  const next = updater(current);
  writeSave(next);
  return next;
}
