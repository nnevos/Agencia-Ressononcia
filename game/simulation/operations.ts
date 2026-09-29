import { incidents } from "@/game/data/incidents";
import { pairKey } from "@/game/data/resonance";
import { applyMissionEffects } from "@/game/simulation/heroState";
import { getElapsedGameMinutes, syncIncidentRuntime } from "@/game/simulation/shift";
import { awardHeroXp } from "@/game/progression/heroProgression";
import type { DispatchResult, SaveGame } from "@/game/types";

export function advanceOperationalState(save: SaveGame, now = Date.now()): SaveGame {
  if (save.shift.status !== "running") return save;
  const gameMinute = getElapsedGameMinutes(save.shift, now);
  let shift = syncIncidentRuntime(save.shift, gameMinute);
  let changed = shift.elapsedGameMinutes !== save.shift.elapsedGameMinutes || shift.status !== save.shift.status;
  const reportQueue = [...shift.reportQueue];

  for (const incident of incidents) {
    const runtime = shift.incidents[incident.id];
    if (runtime?.status !== "dispatched" || runtime.resolvesAtGameMinute === undefined || runtime.resolvesAtGameMinute > gameMinute || !runtime.result) continue;

    const alreadyQueued = reportQueue.some((item) => item.incidentId === runtime.result?.incidentId && item.completedAtGameMinute === runtime.result?.completedAtGameMinute);
    if (!alreadyQueued) reportQueue.push(runtime.result);

    shift = {
      ...shift,
      incidents: {
        ...shift.incidents,
        [incident.id]: { ...runtime, status: "resolved" }
      }
    };
    changed = true;
  }

  if (!changed && reportQueue.length === shift.reportQueue.length) return save;
  shift = { ...shift, reportQueue };
  return { ...save, shift, lastDispatch: reportQueue.at(-1) ?? save.lastDispatch };
}

export function acknowledgeMissionResult(save: SaveGame, result: DispatchResult): SaveGame {
  const runtime = save.shift.incidents[result.incidentId];
  const queue = save.shift.reportQueue.filter((item) => !(item.incidentId === result.incidentId && item.completedAtGameMinute === result.completedAtGameMinute));

  let heroStates = applyMissionEffects(save.heroStates, result.heroEffects);
  let resonance = { ...save.resonance };
  let heroProgression = { ...save.heroProgression };

  for (const effect of result.heroEffects) {
    const currentProgress = heroProgression[effect.heroId];
    if (currentProgress) heroProgression[effect.heroId] = awardHeroXp(currentProgress, effect.xpAwarded);
  }

  const ids = result.selectedHeroIds;
  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      const key = pairKey(ids[i], ids[j]);
      const existing = resonance[key] ?? { a: ids[i], b: ids[j], value: 0, missionsTogether: 0 };
      const positive = result.outcome === "Sucesso" || result.outcome === "Sucesso com custo";
      const nextValue = Math.max(-2, Math.min(2, existing.value + (positive && existing.missionsTogether >= 1 ? 1 : 0)));
      resonance[key] = { ...existing, value: nextValue, missionsTogether: existing.missionsTogether + 1 };
    }
  }

  const nextRuntime = runtime ? { ...runtime, status: "resolved" as const } : runtime;

  return {
    ...save,
    heroStates,
    heroProgression,
    resonance,
    shift: {
      ...save.shift,
      reportQueue: queue,
      incidents: nextRuntime ? { ...save.shift.incidents, [result.incidentId]: nextRuntime } : save.shift.incidents
    },
    lastDispatch: result
  };
}
