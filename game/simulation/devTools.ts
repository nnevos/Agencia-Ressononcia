import { heroes } from "@/game/data/heroes";
import { incidents } from "@/game/data/incidents";
import { createInitialHeroStates, calculateHeroMissionEffect } from "@/game/simulation/heroState";
import { acknowledgeMissionResult, advanceOperationalState } from "@/game/simulation/operations";
import { getMissionAssessment } from "@/game/simulation/resolveIncident";
import { createInitialShift, REAL_MS_PER_GAME_MINUTE, SHIFT_GAME_MINUTES, startShift } from "@/game/simulation/shift";
import type { DispatchResult, Incident, OperationalHero, SaveGame } from "@/game/types";

function runningAt(save: SaveGame, targetMinute: number, now = Date.now()): SaveGame {
  const baseShift = save.shift.status === "not_started" ? startShift(save.shift, now) : save.shift;
  const clamped = Math.max(0, Math.min(SHIFT_GAME_MINUTES, targetMinute));
  return {
    ...save,
    shift: {
      ...baseShift,
      status: "running",
      elapsedGameMinutes: Math.min(baseShift.elapsedGameMinutes, clamped),
      startedAtEpochMs: now - clamped * REAL_MS_PER_GAME_MINUTE
    }
  };
}

function operationalHero(save: SaveGame, heroId: string): OperationalHero | null {
  const hero = heroes.find((item) => item.id === heroId);
  const state = save.heroStates[heroId];
  const progression = save.heroProgression[heroId];
  if (!hero || !state || !progression) return null;
  const unlockedTags = hero.techniques
    .filter((technique) => progression.unlockedTechniqueIds.includes(technique.id))
    .flatMap((technique) => technique.grantedTags ?? []);
  return {
    ...hero,
    ...state,
    ...progression,
    attributes: progression.attributes,
    tags: Array.from(new Set([...hero.tags, ...unlockedTags]))
  };
}

function heroFitScore(save: SaveGame, incident: Incident, heroId: string, assignments: Record<string, number>) {
  const hero = operationalHero(save, heroId);
  if (!hero) return -Infinity;
  const attributeFit = Object.entries(incident.attributeWeights).reduce((sum, [key, weight]) => {
    const attribute = hero.attributes[key as keyof typeof hero.attributes] ?? 0;
    return sum + attribute * (weight ?? 0);
  }, 0);
  const tagFit = incident.recommendedTags.filter((tag) => hero.tags.includes(tag)).length * 4;
  const affinityFit = incident.powerAffinityHeroIds?.includes(heroId) ? 10 : 0;
  const loadPenalty = (assignments[heroId] ?? 0) * 3;
  return attributeFit + tagFit + affinityFit - loadPenalty;
}

function buildForcedSuccess(save: SaveGame, incident: Incident, hero: OperationalHero): DispatchResult {
  const assessment = getMissionAssessment(incident, [hero], save.resonance, save.player.currentDay);
  const availableTags = new Set(hero.tags);
  const matchedTags = incident.recommendedTags.filter((tag) => availableTags.has(tag));
  const missingTags = incident.recommendedTags.filter((tag) => !availableTags.has(tag));
  const attributeScore = assessment.requirements.length
    ? assessment.requirements.reduce((sum, item) => sum + Math.min(1, item.provided / item.required), 0) / assessment.requirements.length
    : 1;

  return {
    incidentId: incident.id,
    selectedHeroIds: [hero.id],
    outcome: "Sucesso",
    matchedTags,
    missingTags,
    decisiveFactors: [
      "DEV MODE: resultado forçado para Sucesso (100%) para acelerar QA de dias seguintes.",
      `Agente de teste selecionado automaticamente: ${hero.name}.`,
      `Estimativa normal desta composição seria ${assessment.successChance}%.`
    ],
    summary: "DEV MODE: ocorrência concluída automaticamente com Sucesso para teste de fluxo e progressão.",
    heroEffects: [calculateHeroMissionEffect(hero, "Sucesso", incident.risk)],
    attributeScore,
    conditionScore: assessment.conditionScore,
    resonanceScore: assessment.resonanceScore,
    specialCombos: [],
    completedAtGameMinute: SHIFT_GAME_MINUTES
  };
}

export function devAdvanceMinutes(save: SaveGame, minutes: number, now = Date.now()): SaveGame {
  const target = Math.min(SHIFT_GAME_MINUTES, save.shift.elapsedGameMinutes + Math.max(0, minutes));
  return advanceOperationalState(runningAt(save, target, now), now);
}

export function devResolveAllAndFinish(save: SaveGame, now = Date.now()): SaveGame {
  const advanced = advanceOperationalState(runningAt(save, SHIFT_GAME_MINUTES, now), now);
  return {
    ...advanced,
    player: { ...advanced.player, developmentRequired: true },
    shift: {
      ...advanced.shift,
      status: "finished",
      elapsedGameMinutes: SHIFT_GAME_MINUTES
    }
  };
}

/**
 * QA shortcut: resolves every still-unarchived occurrence of the current shift as a clean Success,
 * applies normal Success costs/XP, clears reports and lands directly in Development.
 * Existing archived results are preserved and are not awarded twice.
 */
export function devPerfectFinishShift(save: SaveGame): SaveGame {
  let next: SaveGame = save;
  const assignments: Record<string, number> = {};
  let lastResult: DispatchResult | null = null;

  for (const incident of incidents) {
    const runtime = next.shift.incidents[incident.id];
    if (!runtime) continue;
    const pendingReport = next.shift.reportQueue.some((result) => result.incidentId === incident.id);
    const alreadyArchived = runtime?.status === "resolved" && !pendingReport;
    if (alreadyArchived) continue;

    const heroId = heroes
      .map((hero) => hero.id)
      .sort((a, b) => heroFitScore(next, incident, b, assignments) - heroFitScore(next, incident, a, assignments))[0];
    const hero = operationalHero(next, heroId);
    if (!hero) continue;

    assignments[hero.id] = (assignments[hero.id] ?? 0) + 1;
    const result = buildForcedSuccess(next, incident, hero);
    next = acknowledgeMissionResult({
      ...next,
      shift: {
        ...next.shift,
        reportQueue: [...next.shift.reportQueue.filter((item) => item.incidentId !== incident.id), result],
        incidents: {
          ...next.shift.incidents,
          [incident.id]: {
            ...(runtime ?? { incidentId: incident.id, status: "scheduled" as const }),
            status: "resolved",
            selectedHeroIds: [hero.id],
            result,
            resolvesAtGameMinute: SHIFT_GAME_MINUTES
          }
        }
      }
    }, result);
    lastResult = result;
  }

  const flag = "dev_perfect_shift_100";
  return {
    ...next,
    player: { ...next.player, developmentRequired: true },
    shift: {
      ...next.shift,
      status: "finished",
      elapsedGameMinutes: SHIFT_GAME_MINUTES,
      reportQueue: [],
      incidents: Object.fromEntries(Object.entries(next.shift.incidents).map(([id, runtime]) => [id, { ...runtime, status: "resolved" as const }]))
    },
    lastDispatch: lastResult ?? next.lastDispatch,
    flags: next.flags.includes(flag) ? next.flags : [...next.flags, flag]
  };
}

export function devSkipToPostShift(save: SaveGame, now = Date.now()): SaveGame {
  const finished = devResolveAllAndFinish(save, now);
  return {
    ...finished,
    player: { ...finished.player, developmentRequired: false },
    lastDispatch: finished.shift.reportQueue.at(-1) ?? finished.lastDispatch,
    shift: { ...finished.shift, reportQueue: [] },
    flags: finished.flags.includes("dev_skipped_to_post") ? finished.flags : [...finished.flags, "dev_skipped_to_post"]
  };
}

export function devResetShift(save: SaveGame): SaveGame {
  return {
    ...save,
    heroStates: createInitialHeroStates(),
    shift: createInitialShift(save.player.currentDay, save.player.name),
    lastDispatch: null,
    flags: save.flags.filter((flag) => !flag.startsWith("despacho_") && flag !== "dev_skipped_to_post" && flag !== "dev_perfect_shift_100")
  };
}
